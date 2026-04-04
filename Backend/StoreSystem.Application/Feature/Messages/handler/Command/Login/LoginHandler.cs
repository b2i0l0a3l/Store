using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using StoreSystem.Application.Feature.Messages.Request.Command.Login;
using StoreSystem.Application.Interface;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command.Login
{
    public class LoginHandler : IRequestHandler<LoginRequest, Result<TokenModel>>
    {
        private readonly UserManager<User> _UManager;
        private readonly IGenerateJwtToken _JwtToken;
        private readonly IGenerateToken _RefreshToken;
        private readonly IRepository<RefreshToken> _Repo;

        public LoginHandler(IRepository<RefreshToken> repo,UserManager<User> UManager, IGenerateJwtToken JwtToken,IGenerateToken RefreshToken)
        {
            _UManager = UManager;
            _JwtToken = JwtToken;
            _RefreshToken = RefreshToken;
            _Repo = repo;
        }
        public async Task<Result<TokenModel>> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            try
            {
                User? user = await _UManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    return Errors.UserNotFoundError;
                }
                
                bool result = await _UManager.CheckPasswordAsync(user, request.Password);
                if (!result) return Errors.InvalidCredError;

                string TokenId = _RefreshToken.Generate(16);

                List<Claim> Claims = new()
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email!),
                    new Claim(ClaimTypes.Role, user.Role ?? "Viewer"),
                    new Claim("TokenId", TokenId),
                    new Claim("FullName", user.FullName),
                };
                if (user.ImagePath != null)
                    Claims.Add(new Claim("ImagePath", user.ImagePath));
                
                var newRefreshToken = _RefreshToken.Generate(64);
                RefreshToken refreshToken = new()
                {
                    UserId = user.Id,
                    TokenId = TokenId,
                    RefreshTokenHash = BCrypt.Net.BCrypt.HashPassword(newRefreshToken),
                    RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(30),
                    RefreshTokenRevokedAt = null
                };

                await _Repo.Add(refreshToken);


                TokenModel model = new()
                {
                    AccessToken = _JwtToken.Generate(Claims),
                    RefreshToken = newRefreshToken
                };
                return model;
            }catch
            {
                return new Error("LoginError",Core.enums.ErrorType.Failure, "An error occurred during login.");
            }
            
        }
    }
}
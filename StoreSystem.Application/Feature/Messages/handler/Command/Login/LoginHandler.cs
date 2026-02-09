using System;
using System.Collections.Generic;
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
        private readonly IGenerateRefreshToken _RefreshToken;
        private readonly IRepository<RefreshToken> _Repo;

        public LoginHandler(IRepository<RefreshToken> repo,UserManager<User> UManager, IGenerateJwtToken JwtToken,IGenerateRefreshToken RefreshToken)
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

                Claim[] Claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email!),
                    new Claim(ClaimTypes.Role, user.Role)

                };
                var newRefreshToken = _RefreshToken.Generate();
                RefreshToken refreshToken = new()
                {
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
                return new Error("LoginError",Core.enums.ErrorType.General, "An unexpected error occurred during login");
            }
            
        }
    }
}
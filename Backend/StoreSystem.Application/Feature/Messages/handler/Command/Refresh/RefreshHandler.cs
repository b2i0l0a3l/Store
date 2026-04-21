using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using StoreSystem.Application.Feature.Messages.Request.Command.Refresh;
using StoreSystem.Application.Interface;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command.Refresh
{
    public class RefreshHandler : IRequestHandler<RefreshRequest, Result<TokenModel>>
    {
        private readonly IGenerateToken _GenerateRefreshToken;
        private readonly IGenerateJwtToken _GenerateJwtToken;
        private readonly UserManager<User> _UManager;
        private readonly IRepository<RefreshToken> _Repo;
        public RefreshHandler(IRepository<RefreshToken> rep,IGenerateJwtToken GenerateJwtToken,UserManager<User> UManager,IGenerateToken GenerateRefreshToken)
        {
            _GenerateRefreshToken = GenerateRefreshToken;
            _UManager = UManager;
            _GenerateJwtToken = GenerateJwtToken;
            _Repo = rep;
        } 
        public async Task<Result<TokenModel>> Handle(RefreshRequest request, CancellationToken cancellationToken)
        {
            User? user = await _UManager.FindByEmailAsync(request.Email);
            if (user == null) return Errors.UserNotFoundError;

            if (string.IsNullOrEmpty(request.TokenId)) return new Error("RefreshTokenError", Core.enums.ErrorType.General, "Token Id is Required!");

            Result<RefreshToken?> result  = await _Repo.GetByCondition(x=>x.TokenId == request.TokenId);

            if (result.Value == null) return new Error("RefreshTokenError", Core.enums.ErrorType.General, "Refresh Token Not found!");

            RefreshToken refreshToken = result.Value;
         

            if(refreshToken == null) 
                return new Error("RefreshTokenERROR", Core.enums.ErrorType.General, "Invalid refresh token");
            if (refreshToken.RefreshTokenRevokedAt != null)
                return new Error("RefreshTokenRevokedError", Core.enums.ErrorType.General, "Refresh token is revoked");
            if (refreshToken.RefreshTokenExpiresAt == null || refreshToken.RefreshTokenExpiresAt <= DateTime.UtcNow)
                return new Error("RefreshTokenExpiredError", Core.enums.ErrorType.General, "Refresh token expired");
            bool isVerified = BCrypt.Net.BCrypt.Verify(request.RefreshToken, refreshToken.RefreshTokenHash);
            if (!isVerified)
                return new Error("RefreshTokenERROR", Core.enums.ErrorType.General, "Invalid refresh token");
 
            string userRole = _UManager.GetRolesAsync(user).Result.FirstOrDefault() ?? "Staff";
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Role, userRole),
                new Claim("TokenId", refreshToken.TokenId),
                new Claim("FullName", user.FullName),
            };
            if (user.ImagePath != null)
                claims.Add(new Claim("ImagePath", user.ImagePath));
           
            string newAccessToken = _GenerateJwtToken.Generate(claims);
            string newRefreshToken = _GenerateRefreshToken.Generate(64);

            await _Repo.Update(refreshToken.Id, x => 
            {
                x.UserId = user.Id;
                x.RefreshTokenHash = BCrypt.Net.BCrypt.HashPassword(newRefreshToken);
                x.RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7);
            });

            TokenModel model = new()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
            return model;
    }
    }
}
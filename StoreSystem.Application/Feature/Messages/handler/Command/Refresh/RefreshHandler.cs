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
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command.Refresh
{
    public class RefreshHandler : IRequestHandler<RefreshRequest, Result<TokenModel>>
    {
        private readonly IGenerateRefreshToken _GenerateRefreshToken;
        private readonly IGenerateJwtToken _GenerateJwtToken;
        private readonly UserManager<User> _UManager; 
        public RefreshHandler(IGenerateJwtToken GenerateJwtToken,UserManager<User> UManager,IGenerateRefreshToken GenerateRefreshToken)
        {
            _GenerateRefreshToken = GenerateRefreshToken;
            _UManager = UManager;
            _GenerateJwtToken = GenerateJwtToken;
        } 
        public async Task<Result<TokenModel>> Handle(RefreshRequest request, CancellationToken cancellationToken)
        {
            User? user = await _UManager.FindByEmailAsync(request.Email);
            if (user == null) return Errors.UserNotFoundError;
            if (user.RefreshTokenRevokedAt != null)
                return new Error("RefreshTokenRevokedError", Core.enums.ErrorType.General, "Refresh token is revoked");
            if (user.RefreshTokenExpiresAt == null || user.RefreshTokenExpiresAt <= DateTime.UtcNow)
                return new Error("RefreshTokenExpiredError", Core.enums.ErrorType.General, "Refresh token expired");

            bool refreshValid = BCrypt.Net.BCrypt.Verify(request.RefreshToken, user.RefreshTokenHash);
            if (!refreshValid)
                return new Error("RefreshTokenERROR", Core.enums.ErrorType.General, "Invalid refresh token");
            Claim[] claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Role, user.Role)
            };
            string newAccessToken = _GenerateJwtToken.Generate(claims);
            string newRefreshToken = _GenerateRefreshToken.Generate();
            user.RefreshTokenHash =  BCrypt.Net.BCrypt.HashPassword(newRefreshToken);
            user.RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7);
            user.RefreshTokenRevokedAt = null;
            TokenModel model = new()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
            return model;
    }
    }
}
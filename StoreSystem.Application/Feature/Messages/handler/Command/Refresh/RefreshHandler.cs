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
        private readonly IGenerateRefreshToken _GenerateRefreshToken;
        private readonly IGenerateJwtToken _GenerateJwtToken;
        private readonly UserManager<User> _UManager;
        private readonly IRepository<RefreshToken> _Repo;
        public RefreshHandler(IRepository<RefreshToken> rep,IGenerateJwtToken GenerateJwtToken,UserManager<User> UManager,IGenerateRefreshToken GenerateRefreshToken)
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

            Result<RefreshToken?> refresh = await _Repo.GetByCondition(x => x.UserId == user.Id);
            if (!refresh.IsSuccess || refresh.Value == null) return new Error("RefreshTokenNotFound", Core.enums.ErrorType.General, "Refresh token not Found");

            RefreshToken refreshToken = refresh.Value;
            if (refreshToken.RefreshTokenRevokedAt != null)
                return new Error("RefreshTokenRevokedError", Core.enums.ErrorType.General, "Refresh token is revoked");
            if (refreshToken.RefreshTokenExpiresAt == null || refreshToken.RefreshTokenExpiresAt <= DateTime.UtcNow)
                return new Error("RefreshTokenExpiredError", Core.enums.ErrorType.General, "Refresh token expired");

            bool refreshValid = BCrypt.Net.BCrypt.Verify(request.RefreshToken, refreshToken.RefreshTokenHash);
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

            await _Repo.Update(refreshToken.Id, rt =>
            {
                rt.RefreshTokenHash = BCrypt.Net.BCrypt.HashPassword(newRefreshToken);
                rt.RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7);
                rt.RefreshTokenRevokedAt = null;
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
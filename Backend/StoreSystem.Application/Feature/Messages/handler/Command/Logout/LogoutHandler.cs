using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using StoreSystem.Application.Feature.Messages.Request.Command.Logout;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command.Logout
{   
    public class LogoutHandler : IRequestHandler<LogoutRequest, Result>
    {
        private readonly UserManager<User> _user;
        private readonly IRepository<RefreshToken> _repo;
        public LogoutHandler(UserManager<User> user, IRepository<RefreshToken> repo)
        {
            _user = user;
            _repo = repo;
        }
        public async Task<Result> Handle(LogoutRequest request, CancellationToken cancellationToken)
        {
            var user = await _user.FindByEmailAsync(request.Email);
            if (user == null)
                return Errors.UserNotFoundError;

            Result<RefreshToken?> tokensResult = await _repo.GetByCondition(x => x.TokenId == request.TokenId);

            if (tokensResult.Value == null)
                return new Error("RefreshTokenNotFoundError", Core.enums.ErrorType.General, "Refresh Token Not Found");

            RefreshToken refreshToken = tokensResult.Value;


            if (refreshToken == null)
                return new Error("RefreshTokenError", Core.enums.ErrorType.General, "Refresh Token invalid");

            if (refreshToken.RefreshTokenRevokedAt != null)
                return new Error("RefreshTokenRevokedError", Core.enums.ErrorType.General, "Refresh token is already revoked");

            await _repo.Update(refreshToken.Id, x => x.RefreshTokenRevokedAt = DateTime.UtcNow);

            return Result.Success();
        }
    }
}
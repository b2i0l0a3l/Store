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
            
            var res = await _user.FindByEmailAsync(request.Email);
            var t = await _repo.GetByCondition(x=> x.UserId == res!.Id);
            if (res == null)
                return Errors.UserNotFoundError;
            if (t.Value == null) 
                return new Error("RefreshTokenNotFoundError", Core.enums.ErrorType.General, "Refresh Token Not Found");

            bool refreshValid = BCrypt.Net.BCrypt.Verify(request.RefreshToken, t.Value.RefreshTokenHash);
            if (!refreshValid)
                return new Error("RefreshTokenError",Core.enums.ErrorType.General,"Refresh Token invalid");

            t.Value.RefreshTokenRevokedAt = DateTime.UtcNow;
            return Result.Success();
        }
    }
}
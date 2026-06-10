using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query.UserQuery;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models.UserModels;

namespace StoreSystem.Application.Feature.Messages.handler.Query.UserQueryHandler
{
    public class GetUserInfoHandler : IRequestHandler<GetUserInfo, Result<UserInfo>>
    {
        private readonly IUserRepository _userRepository;
        public GetUserInfoHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<Result<UserInfo>> Handle(GetUserInfo request, CancellationToken cancellationToken)
        {
            var userResult = await _userRepository.GetUserById(request.UserId);
            if (!userResult.IsSuccess || userResult.Value == null)
            {
                return userResult.Error!;
            }

            var user = userResult.Value;
            var userInfo = new UserInfo
            {
                Email = user.Email,
                FullName = user.FullName,
                Role = user.Role
            };
            return userInfo;
        }
    }
}
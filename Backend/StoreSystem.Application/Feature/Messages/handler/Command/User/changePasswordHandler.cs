using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class changePasswordHandler : IRequestHandler<ChangePassword, Result<bool>>
    {
        private readonly IUserRepository _userRepository;
        public changePasswordHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<Result<bool>> Handle(ChangePassword request, CancellationToken cancellationToken)
        {
            var result = await _userRepository.ChangePassword(request.UserId, request.OldPassword, request.NewPassword);
            return result;

        }
    }
}
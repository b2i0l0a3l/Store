using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingSystem.Core.common;
using MediatR;
using Microsoft.AspNetCore.Identity;
using StoreSystem.Application.Feature.Messages.Request.Command.Register;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command.Register
{
    public class RegisterHandler : IRequestHandler<RegisterRequest, Result<RegisterModel>>
    {
        private readonly UserManager<User> _UserManager;
        public RegisterHandler(UserManager<User> UserManager)
        {
            _UserManager = UserManager;
        }
        public async Task<Result<RegisterModel>> Handle(RegisterRequest request, CancellationToken cancellationToken)
        {
            try
            {     
                if (await _UserManager.FindByEmailAsync(request.Email) != null)
                    return Errors.EmailAlreadyExistsError;

                User user = new()
                {
                    FullName = request.FullName,
                    UserName = request.Email,
                    Role = Roles.Admin
                };
                var result = await _UserManager.CreateAsync(user, request.Password);
                if (!result.Succeeded)
                {
                    return new Error("CreateUserError", Core.enums.ErrorType.General, string.Join(", ", result.Errors.Select(x => x.Description)));
                }
                return new RegisterModel()
                {
                    Email = user.UserName,
                    Role = user.Role
                };
            }catch(Exception ex)
            {
                return new Error("CreateUserError", Core.enums.ErrorType.General, ex.Message);
            }
        }
    }
}
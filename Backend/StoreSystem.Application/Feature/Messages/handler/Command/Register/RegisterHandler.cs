using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using StoreSystem.Application.Feature.Messages.Request.Command.Register;
using StoreSystem.Application.Interface;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command.Register
{
    public class RegisterHandler : IRequestHandler<RegisterRequest, Result<RegisterModel>>
    {
        private readonly UserManager<User> _UserManager;
        private readonly IAppwriteStorageService _Upload;

        public RegisterHandler(UserManager<User> UserManager,IAppwriteStorageService Upload)
        {
            _UserManager = UserManager;
            _Upload = Upload;

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
                    Email = request.Email,
                    ImagePath = request.ImagePath ?? null
                };
                if (request.Image != null){
                  
                    var imageResult = await _Upload.UploadImageAsync(request.Image);
                    if (imageResult != null)
                    {

                        user.ImagePath = imageResult.ImageUrl;
                        user.FileId = imageResult.FileId;
                    }
                }
                
                var result = await _UserManager.CreateAsync(user, request.Password);
                if (!result.Succeeded)
                {
                    return new Error("CreateUserError", Core.enums.ErrorType.General, string.Join(", ", result.Errors.Select(x => x.Description)));
                }
                var RoleResult = await _UserManager.AddToRoleAsync(user, Roles.User);
                if (!RoleResult.Succeeded)
                {
                    await _UserManager.DeleteAsync(user);

                    return new Error("CreateUserRoleError", Core.enums.ErrorType.General, string.Join(", ", RoleResult.Errors.Select(x => x.Description)));
                }
                return new RegisterModel()
                {
                    Email = user.UserName,
                };
            }catch
            {
                return new Error("CreateUserError", Core.enums.ErrorType.Failure, "Internal server error");
            }
        }
    }
}
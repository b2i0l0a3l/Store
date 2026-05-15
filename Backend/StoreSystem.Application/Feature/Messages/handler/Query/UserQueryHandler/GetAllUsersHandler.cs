using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using StoreSystem.Application.Feature.Messages.Request.Query.UserQuery;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models.UserModels;

namespace StoreSystem.Application.Feature.Messages.handler.Query.UserQueryHandler
{
    public class GetAllUsersHandler : IRequestHandler<GetAllUsersRequest, Result<IEnumerable<UserModel>>>
    {
        private readonly IUserRepository _UserRepo;
        public GetAllUsersHandler(IUserRepository UserRepo)
        {
            _UserRepo = UserRepo;
        }
        public async Task<Result<IEnumerable<UserModel>>> Handle(GetAllUsersRequest request, CancellationToken cancellationToken)
        {
            Result<IEnumerable<UserModel>> users = await _UserRepo.GetAllUsers();
            return users;
        }

    }
}
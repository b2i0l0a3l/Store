using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query.UserQuery;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models.UserModels;

namespace StoreSystem.Application.Feature.Messages.handler.Query.UserQueryHandler
{
    public class GetAllUsersHandler : IRequestHandler<GetAllUsersRequest, Result<IEnumerable<UserModel>>>
    {
        private readonly IRepository<User> _Repo;
        public  GetAllUsersHandler(IRepository<User> Repo)
        {
            _Repo = Repo;
        }
        public async Task<Result<IEnumerable<UserModel>>> Handle(GetAllUsersRequest request, CancellationToken cancellationToken)
        {
            Result<IEnumerable<User>?> Users = await _Repo.All();
            if (!Users.IsSuccess || Users.Value == null) return Users.Error!;
            return Users.Value.Select(x => new UserModel() { Email = x.Email ?? x.UserName!, FullName = x.FullName, Role = x.Role, UserId = x.Id }).ToList();
        }
    }
}
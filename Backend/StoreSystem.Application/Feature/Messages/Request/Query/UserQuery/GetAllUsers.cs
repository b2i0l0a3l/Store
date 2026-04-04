using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.Models.UserModels;

namespace StoreSystem.Application.Feature.Messages.Request.Query.UserQuery
{
    public class GetAllUsersRequest : IRequest<Result<IEnumerable<UserModel>>>
    {
        
    }
}
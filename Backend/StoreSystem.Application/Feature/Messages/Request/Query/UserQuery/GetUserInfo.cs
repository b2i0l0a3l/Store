using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models.UserModels;

namespace StoreSystem.Application.Feature.Messages.Request.Query.UserQuery
{
    public class GetUserInfo : IRequest<Result<UserInfo>>
    {
        public string UserId { get; set; } = string.Empty;
    }
}
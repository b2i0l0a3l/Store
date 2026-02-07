using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Command.Refresh
{
    public class RefreshRequest : IRequest<Result<TokenModel>>
    {
        public string RefreshToken { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

    }
}
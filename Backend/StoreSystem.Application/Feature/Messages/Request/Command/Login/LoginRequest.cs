using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Command.Login
{
    public class LoginRequest : IRequest<Result<TokenModel>>
    {

        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.Request.Command.Logout
{
    public class LogoutRequest : IRequest<Result>
    {
        [Required]
        public string RefreshToken { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
    }
}
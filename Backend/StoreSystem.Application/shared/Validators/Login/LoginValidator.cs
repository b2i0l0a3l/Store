using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command.Login;

namespace StoreSystem.Application.shared.Validators.Login
{
    public class LoginValidator : AbstractValidator<LoginRequest>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email is Required") .EmailAddress().WithMessage("Invalid email format");;
            RuleFor(x => x.Password).NotEmpty().WithMessage("Password is Required");
        }
    }
}
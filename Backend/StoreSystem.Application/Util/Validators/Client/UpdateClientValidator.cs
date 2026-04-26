using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Client
{
    public class UpdateClientValidator : AbstractValidator<UpdateClientRequest>
    {
        public UpdateClientValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Client ID is not valid");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Client name is required")
                .MaximumLength(100).WithMessage("Client name must not exceed 100 characters");

            RuleFor(x => x.PhoneNumber)
                .MaximumLength(20).WithMessage("Phone number must not exceed 20 characters")
                .When(x => !string.IsNullOrEmpty(x.PhoneNumber));
        }
    }
}

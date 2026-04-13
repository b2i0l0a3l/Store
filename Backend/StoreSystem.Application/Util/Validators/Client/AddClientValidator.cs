using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Client
{
    public class AddClientValidator : AbstractValidator<AddClientRequest>
    {
        public AddClientValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("اسم العميل مطلوب")
                .MaximumLength(100).WithMessage("اسم العميل يجب أن لا يتجاوز 100 حرف");

            RuleFor(x => x.PhoneNumber)
                .MaximumLength(20).WithMessage("رقم الهاتف يجب أن لا يتجاوز 20 حرف")
                .When(x => !string.IsNullOrEmpty(x.PhoneNumber));
        }
    }
}

using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Client
{
    public class UpdateClientValidator : AbstractValidator<UpdateClientRequest>
    {
        public UpdateClientValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("معرف العميل غير صالح");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("اسم العميل مطلوب")
                .MaximumLength(100).WithMessage("اسم العميل يجب أن لا يتجاوز 100 حرف");

            RuleFor(x => x.PhoneNumber)
                .MaximumLength(20).WithMessage("رقم الهاتف يجب أن لا يتجاوز 20 حرف")
                .When(x => !string.IsNullOrEmpty(x.PhoneNumber));
        }
    }
}

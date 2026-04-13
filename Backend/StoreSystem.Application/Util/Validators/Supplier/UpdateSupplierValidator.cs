using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Supplier
{
    public class UpdateSupplierValidator : AbstractValidator<UpdateSupplierRequest>
    {
        public UpdateSupplierValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("معرف المورد غير صالح");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("اسم المورد مطلوب")
                .MaximumLength(100).WithMessage("اسم المورد يجب أن لا يتجاوز 100 حرف");

            RuleFor(x => x.PhoneNumber)
                .MaximumLength(20).WithMessage("رقم الهاتف يجب أن لا يتجاوز 20 حرف")
                .When(x => !string.IsNullOrEmpty(x.PhoneNumber));
        }
    }
}

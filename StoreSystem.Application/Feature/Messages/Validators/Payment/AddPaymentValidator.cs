using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Payment
{
    public class AddPaymentValidator : AbstractValidator<AddPaymentRequest>
    {
        public AddPaymentValidator()
        {
            RuleFor(x => x.DebtID)
                .GreaterThan(0).WithMessage("يجب اختيار دين صالح");

            RuleFor(x => x.Amount)
                .GreaterThan(0).WithMessage("مبلغ الدفع يجب أن يكون أكبر من صفر");
        }
    }
}

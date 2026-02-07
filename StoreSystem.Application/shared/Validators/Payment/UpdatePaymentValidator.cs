using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Payment
{
    public class UpdatePaymentValidator : AbstractValidator<UpdatePaymentRequest>
    {
        public UpdatePaymentValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("معرف الدفع غير صالح");

            RuleFor(x => x.DebtID)
                .GreaterThan(0).WithMessage("يجب اختيار دين صالح");

            RuleFor(x => x.Amount)
                .GreaterThan(0).WithMessage("مبلغ الدفع يجب أن يكون أكبر من صفر");
        }
    }
}

using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Debt
{
    public class UpdateDebtValidator : AbstractValidator<UpdateDebtRequest>
    {
        public UpdateDebtValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("معرف الدين غير صالح");

            RuleFor(x => x.OrderId)
                .GreaterThan(0).WithMessage("يجب اختيار طلب صالح");

            RuleFor(x => x.ClientId)
                .GreaterThan(0).WithMessage("يجب اختيار عميل صالح");

            RuleFor(x => x.Remaining)
                .GreaterThanOrEqualTo(0).WithMessage("المبلغ المتبقي يجب أن يكون صفر أو أكبر");
        }
    }
}

using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Debt
{
    public class AddDebtValidator : AbstractValidator<AddDebtRequest>
    {
        public AddDebtValidator()
        {
            RuleFor(x => x.OrderId)
                .GreaterThan(0).WithMessage("يجب اختيار طلب صالح");

            RuleFor(x => x.ClientId)
                .GreaterThan(0).WithMessage("يجب اختيار عميل صالح");

            RuleFor(x => x.Remaining)
                .GreaterThanOrEqualTo(0).WithMessage("المبلغ المتبقي يجب أن يكون صفر أو أكبر");
        }
    }
}

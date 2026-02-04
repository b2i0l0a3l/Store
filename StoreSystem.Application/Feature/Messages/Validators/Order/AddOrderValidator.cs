using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Order
{
    public class AddOrderValidator : AbstractValidator<AddOrderRequest>
    {
        public AddOrderValidator()
        {
            RuleFor(x => x.ClientId)
                .GreaterThan(0).WithMessage("يجب اختيار عميل صالح");

            RuleFor(x => x.Total)
                .GreaterThanOrEqualTo(0).WithMessage("إجمالي الطلب يجب أن يكون صفر أو أكبر");
        }
    }
}

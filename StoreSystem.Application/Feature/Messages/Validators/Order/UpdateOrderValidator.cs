using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Order
{
    public class UpdateOrderValidator : AbstractValidator<UpdateOrderRequest>
    {
        public UpdateOrderValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("معرف الطلب غير صالح");

            RuleFor(x => x.ClientId)
                .GreaterThan(0).WithMessage("يجب اختيار عميل صالح");

            RuleFor(x => x.Total)
                .GreaterThanOrEqualTo(0).WithMessage("إجمالي الطلب يجب أن يكون صفر أو أكبر");
        }
    }
}

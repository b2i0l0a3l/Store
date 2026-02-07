using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.OrderItem
{
    public class UpdateOrderItemValidator : AbstractValidator<UpdateOrderItemRequest>
    {
        public UpdateOrderItemValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("معرف عنصر الطلب غير صالح");

            RuleFor(x => x.ProductId)
                .GreaterThan(0).WithMessage("يجب اختيار منتج صالح");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("سعر العنصر يجب أن يكون أكبر من صفر");
        }
    }
}

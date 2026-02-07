using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.OrderItem
{
    public class AddOrderItemValidator : AbstractValidator<AddOrderItemRequest>
    {
        public AddOrderItemValidator()
        {
            RuleFor(x => x.ProductId)
                .GreaterThan(0).WithMessage("يجب اختيار منتج صالح");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("سعر العنصر يجب أن يكون أكبر من صفر");
        }
    }
}

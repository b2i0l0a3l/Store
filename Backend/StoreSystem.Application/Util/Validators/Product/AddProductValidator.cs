using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Product
{
    public class AddProductValidator : AbstractValidator<AddProductRequest>
    {
        public AddProductValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("اسم المنتج مطلوب")
                .MaximumLength(100).WithMessage("اسم المنتج يجب أن لا يتجاوز 100 حرف");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("سعر المنتج يجب أن يكون أكبر من صفر");

            RuleFor(x => x.Cost)
                .GreaterThanOrEqualTo(0).WithMessage("تكلفة المنتج يجب أن تكون صفر أو أكبر");
            RuleFor(x => x.Cost)
                .GreaterThanOrEqualTo(0).WithMessage("كمية المنتج يجب أن تكون أكبر من 0 ");

            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("يجب اختيار تصنيف صالح");
        }
    }
}

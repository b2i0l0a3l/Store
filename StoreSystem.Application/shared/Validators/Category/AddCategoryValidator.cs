using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Category
{
    public class AddCategoryValidator : AbstractValidator<AddCategoryRequest>
    {
        public AddCategoryValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("اسم التصنيف مطلوب")
                .MaximumLength(20).WithMessage("اسم التصنيف يجب أن لا يتجاوز 20 حرفاً");
        }
    }
}

using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Category
{
    public class UpdateCategoryValidator : AbstractValidator<UpdateCategoryRequest>
    {
        public UpdateCategoryValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("معرف التصنيف غير صالح");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("اسم التصنيف مطلوب")
                .MaximumLength(20).WithMessage("اسم التصنيف يجب أن لا يتجاوز 20 حرفاً");
        }
    }
}

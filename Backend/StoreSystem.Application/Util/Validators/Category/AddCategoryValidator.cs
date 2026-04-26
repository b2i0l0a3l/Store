using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Category
{
    public class AddCategoryValidator : AbstractValidator<AddCategoryRequest>
    {
        public AddCategoryValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Category name is required")
                .MaximumLength(20).WithMessage("Category name must not exceed 20 characters");
        }
    }
}

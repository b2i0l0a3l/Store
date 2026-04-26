using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Product
{
    public class AddProductValidator : AbstractValidator<AddProductRequest>
    {
        public AddProductValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Product name is required")
                .MaximumLength(100).WithMessage("Product name must not exceed 100 characters");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Product price must be a positive number");

            RuleFor(x => x.Cost)
                .GreaterThanOrEqualTo(0).WithMessage("Product cost must be zero or greater");
            RuleFor(x => x.Cost)
                .GreaterThanOrEqualTo(0).WithMessage("Product quantity must be greater than zero");

            RuleFor(x => x.CategoryId)
                .NotEmpty().WithMessage("A valid category must be selected");
        }
    }
}

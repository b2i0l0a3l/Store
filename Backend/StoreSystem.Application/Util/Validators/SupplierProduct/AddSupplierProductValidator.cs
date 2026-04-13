using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.SupplierProduct
{
    public class AddSupplierProductValidator : AbstractValidator<AddSupplierProductRequest>
    {
        public AddSupplierProductValidator()
        {
            RuleFor(x => x.ProductId)
                .GreaterThan(0).WithMessage("يجب اختيار منتج صالح");

            RuleFor(x => x.SupplierId)
                .GreaterThan(0).WithMessage("يجب اختيار مورد صالح");
        }
    }
}

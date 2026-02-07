using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.SupplierProduct
{
    public class UpdateSupplierProductValidator : AbstractValidator<UpdateSupplierProductRequest>
    {
        public UpdateSupplierProductValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("معرف منتج المورد غير صالح");

            RuleFor(x => x.ProductId)
                .GreaterThan(0).WithMessage("يجب اختيار منتج صالح");

            RuleFor(x => x.SupplierId)
                .GreaterThan(0).WithMessage("يجب اختيار مورد صالح");
        }
    }
}

using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;

namespace StoreSystem.Application.Feature.Messages.Validators.Payment
{
    public class UpdatePaymentValidator : AbstractValidator<UpdatePaymentRequest>
    {
        public UpdatePaymentValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("id is required and must be greater than zero");

            RuleFor(x => x.DebtID)
                .GreaterThan(0).WithMessage("Debt ID is required and must be greater than zero");

            RuleFor(x => x.Amount)
                .GreaterThan(0).WithMessage("Amount is required and must be a positive number");
        }
    }
}

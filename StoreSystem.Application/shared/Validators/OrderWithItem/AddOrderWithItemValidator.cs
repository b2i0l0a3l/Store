using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Command.OrderWithITem;

namespace StoreSystem.Application.shared.Validators.OrderWithItem
{
    public class AddOrderWithItemValidator : AbstractValidator<AddOrderWithItemRequest>
    {
        public AddOrderWithItemValidator()
        {
             RuleFor(x => x.OrderItem)
            .NotNull().WithMessage("Order Item Required")
            .NotEmpty().WithMessage("You must add at least one Item");

            RuleFor(x => x.ClientId)
            .NotNull().WithMessage("Client Id is required");
        }
    }
}
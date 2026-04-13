using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command.Order;

namespace StoreSystem.Application.shared.Validators.Order
{
    public class AddOrderWithItemsValidator : AbstractValidator<AddOrderWithItemsRequest>
    {
        public AddOrderWithItemsValidator()
        {
            RuleFor(x => x.ClientId).NotNull().WithMessage("Client Id Is Required.");
            RuleFor(x => x.Items).NotEmpty().WithMessage("You must add at least one item.");
            RuleFor(x => x.Items).NotNull().WithMessage("items is required.");
        }
    }
}
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
            RuleForEach(x => x.Items)
                .ChildRules(items =>
                {
                    items.RuleFor(i => i.quantity)
                        .GreaterThan(0)
                        .WithMessage("Quantity must be a positive number.");
                    items.RuleFor(i => i.productId)
                        .NotEmpty()
                        .WithMessage("Product Id is required.");
                    items.RuleFor(i => i.price)
                        .GreaterThan(0)
                        .WithMessage("Price must be a positive number.");
                });
            }
    }
}
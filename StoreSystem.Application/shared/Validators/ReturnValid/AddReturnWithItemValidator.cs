using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using StoreSystem.Application.Feature.Messages.Request.Command.Return;

namespace StoreSystem.Application.shared.Validators.ReturnValid
{
    public class AddReturnWithItemValidator : AbstractValidator<AddReturnWithItemsRequest>
    {
        public AddReturnWithItemValidator()
        {
            RuleFor(x => x.returnWithItemModel.OrderId).NotNull().WithMessage("Order Id is required.");
            RuleFor(x => x.returnWithItemModel.Items).NotEmpty().WithMessage("you must add at least one item .");
            RuleFor(x => x.returnWithItemModel.Items).NotNull().WithMessage("items Id is required.");
        }
        
    }
}
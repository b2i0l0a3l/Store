using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Application.Feature.Messages.Request.Command.OrderWithITem;
using StoreSystem.Core.common;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command.OrderWithItem
{
    public class ReturnOrderItemHandler : IRequestHandler<ReturnOrderItemRequest, Result>
    {
        private readonly IUniteOfWork _Uow;
        private readonly IMediator _Mediator;

        public ReturnOrderItemHandler(IUniteOfWork uow, IMediator mediator)
        {
            _Uow = uow;
            _Mediator = mediator;
        }

        public async Task<Result> Handle(ReturnOrderItemRequest request, CancellationToken cancellationToken)
        {
            await _Uow.BeginTransactionAsync(cancellationToken);
            try
            {
                // Validate order exists
                var orderResult = await _Uow.Order.GetById(request.OrderId);
                if (orderResult.Value == null)
                    return Result.Failure(new Error("OrderNotFound", Core.enums.ErrorType.General, $"Order with Id {request.OrderId} not found"));

                // Validate order item exists
                var itemResult = await _Uow.OrderItem.GetByCondition(
                    x => x.OrderId == request.OrderId && x.ProductId == request.ProductId);
                if (itemResult.Value == null)
                    return Result.Failure(new Error("OrderItemNotFound", Core.enums.ErrorType.General, $"OrderItem for Product {request.ProductId} in Order {request.OrderId} not found"));

                if (request.Quantity <= 0)
                    return Result.Failure(new Error("InvalidQuantity", Core.enums.ErrorType.General, "Return quantity must be greater than 0"));

                if (request.Quantity > itemResult.Value.Quantity)
                    return Result.Failure(new Error("QuantityExceeds", Core.enums.ErrorType.General, $"Return quantity ({request.Quantity}) exceeds order item quantity ({itemResult.Value.Quantity})"));

                // Publish event
                var returnEvent = new ReturnOrderItemEvent(request.OrderId, request.ProductId, request.Quantity);
                await _Mediator.Publish(new EventNotification<ReturnOrderItemEvent>(returnEvent), cancellationToken);

                await _Uow.CommitAsync(cancellationToken);
                return Result.Success();
            }
            catch (Exception ex)
            {
                await _Uow.RollbackAsync(cancellationToken);
                return Result.Failure(new Error("ReturnOrderItemError", Core.enums.ErrorType.General, ex.Message));
            }
        }
    }
}

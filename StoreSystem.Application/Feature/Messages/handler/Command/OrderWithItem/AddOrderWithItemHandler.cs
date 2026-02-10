using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Command.OrderWithITem;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command.OrderWithItem
{
    public class AddOrderWithItemHandler : IRequestHandler<AddOrderWithItemRequest, Result>
    {
        private readonly IUniteOfWork _UOW;
        private readonly IMediator _mediator;
        public AddOrderWithItemHandler(IMediator mediator,IUniteOfWork unite)
        {
            _UOW = unite;
            _mediator = mediator;
        }
        public async Task<Result> Handle(AddOrderWithItemRequest request, CancellationToken cancellationToken)
        {
            await _UOW.BeginTransactionAsync();
            try
            {
                Result<Order?> order = await _UOW.Order.GetByCondition(x => x.ClientId == request.ClientId && x.OrderType == request.OrderType);
                if (order.Value != null)
                {
                    var req = new UpdateOrderWithItemEvent(order.Value, request.OrderItem);
                    await _mediator.Publish(new EventNotification<UpdateOrderWithItemEvent>(req) );
                }
                else
                {
                    var req = new AddOrderWithItemEvent(request.ClientId, request.OrderType, request.OrderItem);
                    await _mediator.Publish(new EventNotification<AddOrderWithItemEvent>(req));
                }
                await _UOW.CommitAsync(cancellationToken);
                return Result.Success();
            }
            catch (Exception ex)
            {
                await _UOW.RollbackAsync();
                return Result.Failure(new Error("AddOrderWithITemError", Core.enums.ErrorType.General, ex.Message));
            }

        }
    

    }
}
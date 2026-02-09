using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Command.OrderWithITem;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command.OrderWithItem
{
    public class AddOrderWithItemHandler : IRequestHandler<AddOrderWithItemRequest, Result>
    {
        private readonly IUniteOfWork _UOW;
        private readonly IMapper _Mapper;
        public AddOrderWithItemHandler(IUniteOfWork unite,IMapper Mapper)
        {
            _UOW = unite;
            _Mapper = Mapper;
        }
        public async Task<Result> Handle(AddOrderWithItemRequest request, CancellationToken cancellationToken)
        {
            await _UOW.BeginTransactionAsync();
            try
            {
                Result<Order?> order = await _UOW.Order.GetByCondition(x => x.ClientId == request.ClientId && x.OrderType == request.OrderType);
                if (order.Value != null)
                {
                    await HandleUpdate(request, order.Value);
                }
                else
                {
                    await HandleAdd(request);
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
        private async Task HandleAdd(AddOrderWithItemRequest request)
        {
            Result<Order> result = await _UOW.Order.Add(new Order { ClientId = request.ClientId, Total = 0, OrderType = request.OrderType });
            await _UOW.SaveAsync();
            if (result.Value != null)
            {
                List<OrderItem> orderItems = request.OrderItem.Select(x =>
                {
                    x.OrderId = result.Value.Id;
                    return _Mapper.Map<OrderItem>(x);
                }).ToList();

                await _UOW.OrderWithItemRepo.AddRange(orderItems);
                decimal Total = orderItems.Sum(x => x.Price * x.Quantity);
                await _UOW.Order.Update(result.Value.Id, x => x.Total = Total);

                if (request.OrderType == Core.enums.enOrderType.Debt)
                    await HandleDebt(result.Value);
            }
        }
        private async Task HandleUpdate(AddOrderWithItemRequest request, Order Order)
        {
            List<OrderItem> existingItems = new();
            List<OrderItem> notExistingItems = new();
            foreach (OrderItemList item in request.OrderItem)
            {
                item.OrderId = Order.Id;
                Result<OrderItem?> res = await _UOW.OrderItem.GetByCondition(x => x.ProductId == item.ProductId && x.OrderId == Order.Id);
                await _UOW.Product.Update(item.ProductId, x => x.Quantity -= item.Quantity);
                if (res.Value != null)
                {
                    res.Value.Quantity += item.Quantity;
                    existingItems.Add(res.Value);
                    continue;
                }
                notExistingItems.Add(_Mapper.Map<OrderItem>(item));
            }

            if (existingItems.Any())
            {
                await _UOW.OrderWithItemRepo.UpdateRange(existingItems);
            }
            if (notExistingItems.Any())
            {
                await _UOW.OrderWithItemRepo.AddRange(notExistingItems);
            }
            decimal T1 = notExistingItems.Sum(x => x.Price * x.Quantity);
            decimal T2 = existingItems.Sum(x => x.Price * x.Quantity);
            decimal Total = Order.Total + T1 + T2;
            await _UOW.Order.Update(Order.Id, x => x.Total = Total);
        }
        private async Task HandleDebt(Order order)
        {
            await _UOW.Debt.Add(new Debt {ClientId = order.ClientId,Remaining = order.Total, OrderId = order.Id});
        }
    }
}
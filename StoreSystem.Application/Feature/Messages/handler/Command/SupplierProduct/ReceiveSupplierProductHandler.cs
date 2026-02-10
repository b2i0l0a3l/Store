using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Application.Feature.Messages.Request.Command.SupplierProduct;
using StoreSystem.Core.common;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command.SupplierProduct
{
    public class ReceiveSupplierProductHandler : IRequestHandler<ReceiveSupplierProductRequest, Result>
    {
        private readonly IUniteOfWork _Uow;
        private readonly IMediator _Mediator;

        public ReceiveSupplierProductHandler(IUniteOfWork uow, IMediator mediator)
        {
            _Uow = uow;
            _Mediator = mediator;
        }

        public async Task<Result> Handle(ReceiveSupplierProductRequest request, CancellationToken cancellationToken)
        {
            await _Uow.BeginTransactionAsync(cancellationToken);
            try
            {
                if (request.Quantity <= 0)
                    return Result.Failure(new Error("InvalidQuantity", Core.enums.ErrorType.General, "Quantity must be greater than 0"));

                // Validate product exists
                var productResult = await _Uow.Product.GetById(request.ProductId);
                if (productResult.Value == null)
                    return Result.Failure(new Error("ProductNotFound", Core.enums.ErrorType.General, $"Product with Id {request.ProductId} not found"));

                // Publish event
                var supplierProductEvent = new AddSupplierProductEvent(
                    request.SupplierId, request.ProductId, request.Quantity, request.CostPrice);
                await _Mediator.Publish(new EventNotification<AddSupplierProductEvent>(supplierProductEvent), cancellationToken);

                await _Uow.CommitAsync(cancellationToken);
                return Result.Success();
            }
            catch (Exception ex)
            {
                await _Uow.RollbackAsync(cancellationToken);
                return Result.Failure(new Error("ReceiveSupplierProductError", Core.enums.ErrorType.General, ex.Message));
            }
        }
    }
}

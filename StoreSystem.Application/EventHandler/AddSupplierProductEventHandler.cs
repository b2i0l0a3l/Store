using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.EventHandler
{
    public class AddSupplierProductEventHandler : INotificationHandler<EventNotification<AddSupplierProductEvent>>
    {
        private readonly IUniteOfWork _Uow;

        public AddSupplierProductEventHandler(IUniteOfWork Uow)
        {
            _Uow = Uow;
        }

        public async Task Handle(EventNotification<AddSupplierProductEvent> notification, CancellationToken cancellationToken)
        {
            int productId = notification.Event.ProductId;
            int supplierId = notification.Event.SupplierId;
            int quantity = notification.Event.Quantity;
            decimal costPrice = notification.Event.CostPrice;

            var supplierProduct = new SupplierProduct
            {
                ProductId = productId,
                SupplierId = supplierId,
                Quantity = quantity,
                CostPrice = costPrice,
                CreatedAt = DateTime.UtcNow
            };
            await _Uow.SupplierProduct.Add(supplierProduct);

            var productResult = await _Uow.Product.GetById(productId);
            if (productResult.Value != null)
            {
                await _Uow.Product.Update(productId, p =>
                {
                    p.Quantity += quantity;
                    p.Cost = costPrice;
                });
            }
            else
            {
                throw new Exception($"Product with Id {productId} not found. Please create the product first.");
            }
        }
    }
}

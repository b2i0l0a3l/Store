using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.Request.Command.SupplierProduct
{
    public class ReceiveSupplierProductRequest : IRequest<Result>
    {
        public int SupplierId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal CostPrice { get; set; }
    }
}

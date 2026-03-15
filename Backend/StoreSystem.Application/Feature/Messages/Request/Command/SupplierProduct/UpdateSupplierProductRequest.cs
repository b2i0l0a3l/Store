using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class UpdateSupplierProductRequest : IRequest<Result<bool>>
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int SupplierId { get; set; }
    }
}

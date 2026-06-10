using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query.Product
{
    public class GetProductByBarCode : IRequest<Result<ProductsModel>>
    {
        public string BarCode { get; set; } = string.Empty;
    }
}
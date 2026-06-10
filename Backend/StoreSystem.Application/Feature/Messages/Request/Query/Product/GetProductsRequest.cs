using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetProductsRequest : IRequest<Result<PagedResult<ProductsModel>>>
    {
        public string? ProductName { get; set; }
        public string? CategoryName { get; set; }
        public string? BarCode { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
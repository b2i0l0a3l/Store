using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetReturnItemsRequest : IRequest<Result<PagedResult<ReturnItemModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}

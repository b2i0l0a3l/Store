using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;
using StoreSystem.Core.Models.OrderItemModels;

namespace StoreSystem.Core.interfaces
{
    public interface IGetOrderItemPagination
    {
        Task<Result<PagedResult<OrderItemWithTotalCount>>> handle(int PageNumber, int PageSize);
    }
}
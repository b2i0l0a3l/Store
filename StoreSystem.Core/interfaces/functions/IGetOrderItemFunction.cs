using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Core.interfaces
{
    public interface IGetOrderItemFunction
    {
        Task<Result<PagedResult<OrderItemFunctionModel>>> GetOrderItemByOrderIdAsync(int PageNumber, int PageSize,int OrderId);
        
    }
}
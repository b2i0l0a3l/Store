using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models.OrderItemModels;

namespace StoreSystem.Core.interfaces.functions.OrderFunctions
{
    public interface IGetOrderItemsByOrderIdFunc
    {
        Task<Result<IEnumerable<GetOrderItemFunctionModel>>> GetResultAsync(int OrderId);
    }
}
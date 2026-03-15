using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Core.interfaces.functions.OrderFunctions
{
    public interface IGetAllOrdersFunction
    {
        Task<Result<IEnumerable<OrderCardModel>>> Handle();
        
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models.DashboardModels;

namespace StoreSystem.Core.interfaces.functions.ProductFunctions
{
    public interface IFnLowStockAlertsFunction
    {
        Task<Result<IEnumerable<LowStockProductModel>>> Handle();
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models.DashboardModels;

namespace StoreSystem.Core.interfaces.functions.OrderFunctions
{
    public interface IFnSalesOverTimeFunction
    {
        Task<Result<IEnumerable<SalesOverTimeModel>>> Handle(int days);
    }
}

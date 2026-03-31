using System.Threading.Tasks;
using StoreSystem.Core.common;

namespace StoreSystem.Core.interfaces.functions.OrderFunctions
{
    public interface IGetTotalOrdersFunction
    {
        Task<Result<decimal>> Handle();
    }
}

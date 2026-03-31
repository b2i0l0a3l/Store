using System.Threading.Tasks;
using StoreSystem.Core.common;

namespace StoreSystem.Core.interfaces.functions.DebtFunctions
{
    public interface IGetTotalRemainingFunction
    {
        Task<Result<decimal>> Handle();
    }
}

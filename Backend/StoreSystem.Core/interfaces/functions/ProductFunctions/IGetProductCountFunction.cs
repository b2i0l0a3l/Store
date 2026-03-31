using System.Threading.Tasks;
using StoreSystem.Core.common;

namespace StoreSystem.Core.interfaces.functions.ProductFunctions
{
    public interface IGetProductCountFunction
    {
        Task<Result<int>> Handle();
    }
}

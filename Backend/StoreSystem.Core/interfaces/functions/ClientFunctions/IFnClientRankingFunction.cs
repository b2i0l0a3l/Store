using System.Collections.Generic;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models.ClientModels;

namespace StoreSystem.Core.interfaces.functions.ClientFunctions
{
    public interface IFnClientRankingFunction
    {
        Task<Result<IEnumerable<ClientRankingModel>>> Handle();
    }
}

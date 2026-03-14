using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models.DebtModels;

namespace StoreSystem.Core.interfaces.functions
{
    public interface IGetDebts
    {
        Task<Result<IEnumerable<GetDebtModel>>> GetResultAsync(); 
    }
}
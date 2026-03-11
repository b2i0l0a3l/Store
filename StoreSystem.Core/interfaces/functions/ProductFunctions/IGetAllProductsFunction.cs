using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;
using StoreSystem.Core.Models.ProductModels;

namespace StoreSystem.Core.interfaces.functions
{
    public interface IGetAllProductsFunction
    {
        Task<Result<IEnumerable<GetAllProductModel>>> handle();
        
    }
}
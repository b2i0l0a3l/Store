using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Core.interfaces
{
    public interface IGetProductsFucntion
    {
        Task<Result<PagedResult<ProductsModel>>> GetProductsAsync(int PageNumber, int PageSize);
    }
}
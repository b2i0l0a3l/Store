using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Core.interfaces
{
    public interface ISearchProduct
    {
        Task<Result<PagedResult<ProductsModel>>> Handle(string? ProductName, int? CategoryId, int PageNumber, int PageSize);
    }
}
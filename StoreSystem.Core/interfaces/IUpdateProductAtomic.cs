using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;

namespace StoreSystem.Core.interfaces
{
    public interface IUpdateProductAtomic
    {
        Task<Result> UpdateProduct(int id,Product newProduct);
    }
}
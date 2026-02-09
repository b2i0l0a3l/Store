using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;

namespace StoreSystem.Core.interfaces
{
    public interface IOrderWithItemRepo
    {
        Task<Result> AddRange(IEnumerable<OrderItem> Entities);
        Task<Result> UpdateRange(IEnumerable<OrderItem> Entities);
    }
}
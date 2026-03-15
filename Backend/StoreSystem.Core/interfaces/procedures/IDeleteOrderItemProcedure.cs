using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;

namespace StoreSystem.Core.interfaces
{
    public interface IDeleteOrderItemProcedure
    {
        Task<Result> Handle(int OrderItemId);
    }
}
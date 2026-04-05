using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models.PaymentModels;

namespace StoreSystem.Core.interfaces.functions.PaymentFunctions
{
    public interface IFnGetAllPaymentsFunction
    {
        Task<Result<IEnumerable<GetAllPaymentModel>>> Handle();
    }
}
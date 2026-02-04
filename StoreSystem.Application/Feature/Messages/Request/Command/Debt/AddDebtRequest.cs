using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class AddDebtRequest : IRequest<Result<DebtModel>>
    {
        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public decimal Remaining { get; set; }
    }
}

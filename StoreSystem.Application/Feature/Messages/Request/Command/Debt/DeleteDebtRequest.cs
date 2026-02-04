using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class DeleteDebtRequest : IRequest<Result<bool>>
    {
        public int Id { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Command.Return
{
    public class AddReturnWithItemsRequest : IRequest<Result>
    {
        public required ReturnWithItemModel returnWithItemModel { get; set; }
        
    }
}
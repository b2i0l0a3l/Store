using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class AddCategoryRequest : IRequest<Result<CategoryModel>>
    {
        public string Name { get; set; } = string.Empty;
    }
}

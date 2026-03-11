using System.Collections.Generic;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetAllCategoriesRequest : IRequest<Result<IEnumerable<CategoryModel>>>
    {
    }
}

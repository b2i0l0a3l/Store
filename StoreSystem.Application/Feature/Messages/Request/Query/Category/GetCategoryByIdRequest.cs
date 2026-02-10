using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetCategoryByIdRequest : IRequest<Result<CategoryModel>>
    {
        public int Id { get; set; }
    }
}

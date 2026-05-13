using MediatR;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public record AddCategoryRequest : IRequest<Result<int>>
    {
        public string Name { get; set; } = string.Empty;
    }
}

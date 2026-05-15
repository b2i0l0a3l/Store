using FluentAssertions;
using Moq;
using StoreSystem.Application.Feature.Messages.handler.Query;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using CategoryEntity = StoreSystem.Core.Entities.Category;

namespace StoreSystem.Tests.Features.Category
{
    public class GetCategoryByIdHandlerTests
    {
        private readonly Mock<IQueryService<CategoryEntity>> _queryMock;
        private readonly GetCategoryByIdHandler _handler;

        public GetCategoryByIdHandlerTests()
        {
            _queryMock = new Mock<IQueryService<CategoryEntity>>();
            _handler = new GetCategoryByIdHandler(_queryMock.Object);
        }

        [Fact]
        public async Task Handle_ShouldReturnSuccess_WhenCategoryExists()
        {
            // Arrange
            var categoryId = 1;
            var request = new GetCategoryByIdRequest { Id = categoryId };
            var categoryModel = new CategoryModel(categoryId, "Test Category");

            _queryMock
                .Setup(x => x.FindById(categoryId, It.IsAny<System.Linq.Expressions.Expression<Func<CategoryEntity, CategoryModel>>>()))
                .ReturnsAsync(Result<CategoryModel>.Success(categoryModel));

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().NotBeNull();
            result.Value!.Id.Should().Be(categoryId);
            result.Value!.Name.Should().Be(categoryModel.Name);
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenCategoryDoesNotExist()
        {
            // Arrange
            var categoryId = 1;
            var request = new GetCategoryByIdRequest { Id = categoryId };

            _queryMock
                .Setup(x => x.FindById(categoryId, It.IsAny<System.Linq.Expressions.Expression<Func<CategoryEntity, CategoryModel>>>()))
                .ReturnsAsync(new Error("NotFound", ErrorType.NotFound, "Not Found"));

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error.Should().NotBeNull();
            result.Error!.Id.Should().Be("NotFound");
        }
    }
}

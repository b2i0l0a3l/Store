using FluentAssertions;
using Moq;
using StoreSystem.Application.Feature.Messages.handler.Query;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;
using CategoryEntity = StoreSystem.Core.Entities.Category;

namespace StoreSystem.Tests.Features.Category
{
    public class GetCategoryByIdHandlerTests
    {
        private readonly Mock<IRepository<CategoryEntity>> _repositoryMock;
        private readonly GetCategoryByIdHandler _handler;

        public GetCategoryByIdHandlerTests()
        {
            _repositoryMock = new Mock<IRepository<CategoryEntity>>();
            _handler = new GetCategoryByIdHandler(_repositoryMock.Object);
        }

        [Fact]
        public async Task Handle_ShouldReturnSuccess_WhenCategoryExists()
        {
            // Arrange
            var categoryId = 1;
            var request = new GetCategoryByIdRequest { Id = categoryId };
            var category = new CategoryEntity { Id = categoryId, Name = "Test Category" };

            _repositoryMock
                .Setup(x => x.GetById(categoryId))
                .ReturnsAsync(Result<CategoryEntity?>.Success(category));

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().NotBeNull();
            result.Value!.Id.Should().Be(categoryId);
            result.Value!.Name.Should().Be(category.Name);
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenCategoryDoesNotExist()
        {
            // Arrange
            var categoryId = 1;
            var request = new GetCategoryByIdRequest { Id = categoryId };

            _repositoryMock
                .Setup(x => x.GetById(categoryId))
                .ReturnsAsync(Result<CategoryEntity?>.Success(null));

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error.Should().NotBeNull();
            result.Error!.Id.Should().Be("NotFound");
        }
    }
}

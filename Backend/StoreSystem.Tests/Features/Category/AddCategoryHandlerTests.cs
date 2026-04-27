using FluentAssertions;
using Moq;
using StoreSystem.Application.Feature.Messages.handler.Command;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using CategoryEntity = StoreSystem.Core.Entities.Category;

namespace StoreSystem.Tests.Features.Category
{
    public class AddCategoryHandlerTests
    {
        private readonly Mock<IRepository<CategoryEntity>> _repositoryMock;
        private readonly AddCategoryHandler _handler;

        public AddCategoryHandlerTests()
        {
            _repositoryMock = new Mock<IRepository<CategoryEntity>>();
            _handler = new AddCategoryHandler(_repositoryMock.Object);
        }

        [Fact]
        public async Task Handle_ShouldReturnSuccess_WhenCategoryIsAdded()
        {
            // Arrange
            var request = new AddCategoryRequest { Name = "Test Category" };
            var category = new CategoryEntity { Id = 1, Name = "Test Category" };

            _repositoryMock
                .Setup(x => x.Add(It.IsAny<CategoryEntity>()))
                .ReturnsAsync(Result<CategoryEntity>.Success(category));

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().NotBeNull();
            result.Value!.Name.Should().Be(request.Name);

            _repositoryMock.Verify(
                x => x.Add(It.Is<CategoryEntity>(c => c.Name == request.Name)),
                Times.Once);
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenRepositoryFails()
        {
            // Arrange
            var request = new AddCategoryRequest { Name = "Test Category" };
            var error = new Error("TestError", ErrorType.General, "Failed to add category");

            _repositoryMock
                .Setup(x => x.Add(It.IsAny<CategoryEntity>()))
                .ReturnsAsync((Result<CategoryEntity>)error);

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error.Should().Be(error);
        }
    }
}

using FluentAssertions;
using Moq;
using StoreSystem.Application.Feature.Messages.handler.Command.Order;
using StoreSystem.Application.Feature.Messages.Request.Command.Order;
using StoreSystem.Application.Interface;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Tests.Features.Order
{
    public class AddOrderWithItemsHandlerTests
    {
        private readonly Mock<IHandleOrderWithHisItemsProcedure> _orderProcedureMock;
        private readonly Mock<IBackgroundTaskQueue> _taskQueueMock;
        private readonly AddOrderWithItemsHandler _handler;

        public AddOrderWithItemsHandlerTests()
        {
            _orderProcedureMock = new Mock<IHandleOrderWithHisItemsProcedure>();
            _taskQueueMock = new Mock<IBackgroundTaskQueue>();
            _handler = new AddOrderWithItemsHandler(_orderProcedureMock.Object, _taskQueueMock.Object);
        }

        [Fact]
        public async Task Handle_ShouldReturnSuccess_WhenOrderIsCreatedSuccessfully()
        {
            // Arrange
            var request = new AddOrderWithItemsRequest
            {
                ClientId = 1,
                OrderType = enOrderType.Sell,
                Items = [new OrderItemList { productId = 1, quantity = 2, price = 10 }]
            };

            _orderProcedureMock
                .Setup(x => x.handle(It.IsAny<OrderWithItemModel>()))
                .ReturnsAsync(Result.Success());

            _taskQueueMock
                .Setup(x => x.EnqueueAsync(It.IsAny<Func<IServiceProvider, CancellationToken, Task>>()))
                .Returns(ValueTask.CompletedTask);

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeTrue();

            _orderProcedureMock.Verify(
                x => x.handle(It.Is<OrderWithItemModel>(m => m.Client_Id == request.ClientId)),
                Times.Once);

            _taskQueueMock.Verify(
                x => x.EnqueueAsync(It.IsAny<Func<IServiceProvider, CancellationToken, Task>>()),
                Times.Once);
        }

        [Fact]
        public async Task Handle_ShouldReturnFailure_WhenProcedureFails()
        {
            // Arrange
            var request = new AddOrderWithItemsRequest
            {
                ClientId = 1,
                Items = []
            };
            var error = new Error("OrderError", ErrorType.General, "Failed to create order");

            _orderProcedureMock
                .Setup(x => x.handle(It.IsAny<OrderWithItemModel>()))
                .ReturnsAsync(Result.Failure(error));

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error.Should().Be(error);

            _taskQueueMock.Verify(
                x => x.EnqueueAsync(It.IsAny<Func<IServiceProvider, CancellationToken, Task>>()),
                Times.Never);
        }
    }
}

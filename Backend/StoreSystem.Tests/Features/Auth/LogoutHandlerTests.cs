using System.Linq.Expressions;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;
using StoreSystem.Application.Feature.Messages.handler.Command.Logout;
using StoreSystem.Application.Feature.Messages.Request.Command.Logout;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Tests.Features.Auth
{
    public class LogoutHandlerTests
    {
        private readonly Mock<UserManager<User>> _userManagerMock;
        private readonly Mock<IRepository<RefreshToken>> _refreshTokenRepoMock;
        private readonly LogoutHandler _handler;

        public LogoutHandlerTests()
        {
            var store = new Mock<IUserStore<User>>();
            _userManagerMock = new Mock<UserManager<User>>(
                store.Object, null!, null!, null!, null!, null!, null!, null!, null!);

            _refreshTokenRepoMock = new Mock<IRepository<RefreshToken>>();
            _handler = new LogoutHandler(_userManagerMock.Object, _refreshTokenRepoMock.Object);
        }

        [Fact]
        public async Task Handle_ShouldReturnSuccess_WhenLogoutIsSuccessful()
        {
            // Arrange
            var request = new LogoutRequest { Email = "test@test.com", TokenId = "token-id" };
            var user = new User { Id = "1", Email = "test@test.com" };
            var refreshToken = new RefreshToken { Id = 1, TokenId = "token-id" };

            _userManagerMock.Setup(x => x.FindByEmailAsync(request.Email)).ReturnsAsync(user);

            _refreshTokenRepoMock
                .Setup(x => x.GetByCondition(It.IsAny<Expression<Func<RefreshToken, bool>>>()))
                .ReturnsAsync(Result<RefreshToken?>.Success(refreshToken));

            _refreshTokenRepoMock
                .Setup(x => x.Update(It.IsAny<int>(), It.IsAny<Action<RefreshToken>>()))
                .ReturnsAsync(Result<bool>.Success(true));

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeTrue();

            _refreshTokenRepoMock.Verify(
                x => x.Update(refreshToken.Id, It.IsAny<Action<RefreshToken>>()),
                Times.Once);
        }
    }
}

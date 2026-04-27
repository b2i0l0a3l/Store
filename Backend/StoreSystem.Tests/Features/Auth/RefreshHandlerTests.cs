using System.Linq.Expressions;
using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;
using StoreSystem.Application.Feature.Messages.handler.Command.Refresh;
using StoreSystem.Application.Feature.Messages.Request.Command.Refresh;
using StoreSystem.Application.Interface;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Tests.Features.Auth
{
    public class RefreshHandlerTests
    {
        private readonly Mock<UserManager<User>> _userManagerMock;
        private readonly Mock<IGenerateJwtToken> _jwtTokenMock;
        private readonly Mock<IGenerateToken> _refreshTokenGenMock;
        private readonly Mock<IRepository<RefreshToken>> _refreshTokenRepoMock;
        private readonly RefreshHandler _handler;

        public RefreshHandlerTests()
        {
            var store = new Mock<IUserStore<User>>();
            _userManagerMock = new Mock<UserManager<User>>(
                store.Object, null!, null!, null!, null!, null!, null!, null!, null!);

            _jwtTokenMock = new Mock<IGenerateJwtToken>();
            _refreshTokenGenMock = new Mock<IGenerateToken>();
            _refreshTokenRepoMock = new Mock<IRepository<RefreshToken>>();

            _handler = new RefreshHandler(
                _refreshTokenRepoMock.Object,
                _jwtTokenMock.Object,
                _userManagerMock.Object,
                _refreshTokenGenMock.Object);
        }

        [Fact]
        public async Task Handle_ShouldReturnNewTokens_WhenRefreshTokenIsValid()
        {
            // Arrange
            var refreshTokenValue = "valid-refresh-token";
            var request = new RefreshRequest
            {
                Email = "test@test.com",
                RefreshToken = refreshTokenValue,
                TokenId = "token-id"
            };

            var user = new User { Id = "1", Email = "test@test.com", FullName = "Test User" };
            var refreshTokenEntity = new RefreshToken
            {
                Id = 1,
                TokenId = "token-id",
                RefreshTokenHash = BCrypt.Net.BCrypt.HashPassword(refreshTokenValue),
                RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(1)
            };

            _userManagerMock.Setup(x => x.FindByEmailAsync(request.Email)).ReturnsAsync(user);
            _userManagerMock.Setup(x => x.GetRolesAsync(user)).ReturnsAsync(["Staff"]);

            _refreshTokenRepoMock
                .Setup(x => x.GetByCondition(It.IsAny<Expression<Func<RefreshToken, bool>>>()))
                .ReturnsAsync(Result<RefreshToken?>.Success(refreshTokenEntity));

            _refreshTokenGenMock.Setup(x => x.Generate(It.IsAny<int>())).Returns("new-refresh-token");
            _jwtTokenMock.Setup(x => x.Generate(It.IsAny<IEnumerable<Claim>>())).Returns("new-jwt-token");

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeTrue();
            result.Value!.AccessToken.Should().Be("new-jwt-token");
            result.Value!.RefreshToken.Should().Be("new-refresh-token");
        }

        [Fact]
        public async Task Handle_ShouldReturnError_WhenRefreshTokenIsExpired()
        {
            // Arrange
            var refreshTokenValue = "expired-token";
            var request = new RefreshRequest
            {
                Email = "test@test.com",
                RefreshToken = refreshTokenValue,
                TokenId = "token-id"
            };

            var user = new User { Id = "1", Email = "test@test.com" };
            var refreshTokenEntity = new RefreshToken
            {
                Id = 1,
                TokenId = "token-id",
                RefreshTokenHash = BCrypt.Net.BCrypt.HashPassword(refreshTokenValue),
                RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(-1)
            };

            _userManagerMock.Setup(x => x.FindByEmailAsync(request.Email)).ReturnsAsync(user);

            _refreshTokenRepoMock
                .Setup(x => x.GetByCondition(It.IsAny<Expression<Func<RefreshToken, bool>>>()))
                .ReturnsAsync(Result<RefreshToken?>.Success(refreshTokenEntity));

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Id.Should().Be("RefreshTokenExpiredError");
        }
    }
}

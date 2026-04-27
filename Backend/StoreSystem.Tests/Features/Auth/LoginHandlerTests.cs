using System.Linq.Expressions;
using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;
using StoreSystem.Application.Feature.Messages.handler.Command.Login;
using StoreSystem.Application.Feature.Messages.Request.Command.Login;
using StoreSystem.Application.Interface;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Tests.Features.Auth
{
    public class LoginHandlerTests
    {
        private readonly Mock<UserManager<User>> _userManagerMock;
        private readonly Mock<IGenerateJwtToken> _jwtTokenMock;
        private readonly Mock<IGenerateToken> _refreshTokenGenMock;
        private readonly Mock<IRepository<RefreshToken>> _refreshTokenRepoMock;
        private readonly LoginHandler _handler;

        public LoginHandlerTests()
        {
            var store = new Mock<IUserStore<User>>();
            _userManagerMock = new Mock<UserManager<User>>(
                store.Object, null!, null!, null!, null!, null!, null!, null!, null!);

            _jwtTokenMock = new Mock<IGenerateJwtToken>();
            _refreshTokenGenMock = new Mock<IGenerateToken>();
            _refreshTokenRepoMock = new Mock<IRepository<RefreshToken>>();

            _handler = new LoginHandler(
                _refreshTokenRepoMock.Object,
                _userManagerMock.Object,
                _jwtTokenMock.Object,
                _refreshTokenGenMock.Object);
        }

        [Fact]
        public async Task Handle_ShouldReturnToken_WhenCredentialsAreValid()
        {
            // Arrange
            var request = new LoginRequest { Email = "test@test.com", Password = "Password123!" };
            var user = new User { Id = "1", Email = "test@test.com", FullName = "Test User" };

            _userManagerMock.Setup(x => x.FindByEmailAsync(request.Email)).ReturnsAsync(user);
            _userManagerMock.Setup(x => x.CheckPasswordAsync(user, request.Password)).ReturnsAsync(true);
            _userManagerMock.Setup(x => x.GetRolesAsync(user)).ReturnsAsync(["Admin"]);

            _refreshTokenGenMock.Setup(x => x.Generate(It.IsAny<int>())).Returns("token");
            _jwtTokenMock.Setup(x => x.Generate(It.IsAny<IEnumerable<Claim>>())).Returns("jwt-token");
            _refreshTokenRepoMock
                .Setup(x => x.Add(It.IsAny<RefreshToken>()))
                .ReturnsAsync(Result<RefreshToken>.Success(new RefreshToken()));

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeTrue();
            result.Value!.AccessToken.Should().Be("jwt-token");

            _jwtTokenMock.Verify(
                x => x.Generate(It.Is<IEnumerable<Claim>>(
                    c => c.Any(claim => claim.Type == ClaimTypes.Role && claim.Value == "Admin"))),
                Times.Once);
        }

        [Fact]
        public async Task Handle_ShouldReturnUserNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var request = new LoginRequest { Email = "nonexistent@test.com", Password = "Password123!" };
            _userManagerMock.Setup(x => x.FindByEmailAsync(request.Email)).ReturnsAsync((User?)null);

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Id.Should().Be("UserNotFound");
        }

        [Fact]
        public async Task Handle_ShouldReturnInvalidCred_WhenPasswordIsIncorrect()
        {
            // Arrange
            var request = new LoginRequest { Email = "test@test.com", Password = "WrongPassword" };
            var user = new User { Id = "1", Email = "test@test.com" };

            _userManagerMock.Setup(x => x.FindByEmailAsync(request.Email)).ReturnsAsync(user);
            _userManagerMock.Setup(x => x.CheckPasswordAsync(user, request.Password)).ReturnsAsync(false);

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Id.Should().Be("InvalidCredError");
        }
    }
}

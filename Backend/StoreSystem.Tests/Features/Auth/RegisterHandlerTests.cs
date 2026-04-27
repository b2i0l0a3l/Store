using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;
using StoreSystem.Application.Feature.Messages.handler.Command.Register;
using StoreSystem.Application.Feature.Messages.Request.Command.Register;
using StoreSystem.Application.Interface;
using StoreSystem.Core.Entities;
using BookingSystem.Core.common;

namespace StoreSystem.Tests.Features.Auth
{
    public class RegisterHandlerTests
    {
        private readonly Mock<UserManager<User>> _userManagerMock;
        private readonly Mock<IUploadImage> _uploadImageMock;
        private readonly RegisterHandler _handler;

        public RegisterHandlerTests()
        {
            var store = new Mock<IUserStore<User>>();
            _userManagerMock = new Mock<UserManager<User>>(
                store.Object, null!, null!, null!, null!, null!, null!, null!, null!);

            _uploadImageMock = new Mock<IUploadImage>();
            _handler = new RegisterHandler(_userManagerMock.Object, _uploadImageMock.Object);
        }

        [Fact]
        public async Task Handle_ShouldReturnSuccess_WhenRegistrationIsSuccessful()
        {
            // Arrange
            var request = new RegisterRequest
            {
                Email = "new@test.com",
                FullName = "New User",
                Password = "Password123!"
            };

            _userManagerMock.Setup(x => x.FindByEmailAsync(request.Email)).ReturnsAsync((User?)null);
            _userManagerMock.Setup(x => x.CreateAsync(It.IsAny<User>(), request.Password)).ReturnsAsync(IdentityResult.Success);
            _userManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<User>(), Roles.Staff)).ReturnsAsync(IdentityResult.Success);

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeTrue();
            result.Value!.Email.Should().Be(request.Email);
        }

        [Fact]
        public async Task Handle_ShouldReturnError_WhenEmailAlreadyExists()
        {
            // Arrange
            var request = new RegisterRequest { Email = "existing@test.com" };
            _userManagerMock.Setup(x => x.FindByEmailAsync(request.Email)).ReturnsAsync(new User());

            // Act
            var result = await _handler.Handle(request, CancellationToken.None);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Id.Should().Be("EmailFoundError");
        }
    }
}

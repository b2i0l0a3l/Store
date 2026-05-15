using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using StoreApi.Api.Middleware;

namespace StoreSystem.Tests.Middleware
{
    public class AuditMiddlewareTests
    {
        private readonly Mock<RequestDelegate> _nextMock;
        private readonly AuditMiddleware _middleware;

        public AuditMiddlewareTests()
        {
            _nextMock = new Mock<RequestDelegate>();
            _middleware = new AuditMiddleware(_nextMock.Object);
        }

        [Fact]
        public async Task Invoke_ShouldCallNextDelegate()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.Request.Method = "POST";
            context.Request.Path = "/api/test";
            context.Response.StatusCode = 200;

            var claims = new List<Claim> { new(ClaimTypes.NameIdentifier, "user-123") };
            context.User = new ClaimsPrincipal(new ClaimsIdentity(claims));

            _nextMock.Setup(x => x(It.IsAny<HttpContext>())).Returns(Task.CompletedTask);

            // Act
            await _middleware.Invoke(context);

            // Assert
            _nextMock.Verify(x => x(context), Times.Once);
        }
    }
}

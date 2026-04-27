using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Moq;
using StoreApi.Api.Middleware;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Tests.Middleware
{
    public class AuditMiddlewareTests
    {
        private readonly Mock<RequestDelegate> _nextMock;
        private readonly Mock<ILogger<AuditMiddleware>> _loggerMock;
        private readonly Mock<IRepository<AuditLog>> _auditRepoMock;
        private readonly AuditMiddleware _middleware;

        public AuditMiddlewareTests()
        {
            _nextMock = new Mock<RequestDelegate>();
            _loggerMock = new Mock<ILogger<AuditMiddleware>>();
            _auditRepoMock = new Mock<IRepository<AuditLog>>();
            _middleware = new AuditMiddleware(_nextMock.Object, _loggerMock.Object);
        }

        [Fact]
        public async Task Invoke_ShouldLogAudit_WhenMethodIsNotGet()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.Request.Method = "POST";
            context.Request.Path = "/api/test";
            context.Response.StatusCode = 200;

            var claims = new List<Claim> { new(ClaimTypes.NameIdentifier, "user-123") };
            context.User = new ClaimsPrincipal(new ClaimsIdentity(claims));

            _nextMock.Setup(x => x(It.IsAny<HttpContext>())).Returns(Task.CompletedTask);
            _auditRepoMock
                .Setup(x => x.Add(It.IsAny<AuditLog>()))
                .ReturnsAsync(Result<AuditLog>.Success(new AuditLog()));

            // Act
            await _middleware.Invoke(context, _auditRepoMock.Object);

            // Assert
            _auditRepoMock.Verify(
                x => x.Add(It.Is<AuditLog>(log =>
                    log.Method == "POST" &&
                    log.Endpoint == "/api/test" &&
                    log.UserId == "user-123")),
                Times.Once);
        }

        [Fact]
        public async Task Invoke_ShouldNotLogAudit_WhenMethodIsGet()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.Request.Method = "GET";

            _nextMock.Setup(x => x(It.IsAny<HttpContext>())).Returns(Task.CompletedTask);

            // Act
            await _middleware.Invoke(context, _auditRepoMock.Object);

            // Assert
            _auditRepoMock.Verify(x => x.Add(It.IsAny<AuditLog>()), Times.Never);
        }
    }
}

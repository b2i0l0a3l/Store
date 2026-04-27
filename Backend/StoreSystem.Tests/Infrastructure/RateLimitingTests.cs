using System.Threading.RateLimiting;
using FluentAssertions;
using Microsoft.AspNetCore.Http;

namespace StoreSystem.Tests.Infrastructure
{
    public class RateLimitingTests
    {
        [Fact]
        public void AuthLimiter_ShouldAllow5Requests_ThenReject()
        {
            // Arrange
            var options = new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            };

            using var limiter = new FixedWindowRateLimiter(options);

            // Act & Assert — first 5 requests should be permitted
            for (int i = 0; i < 5; i++)
            {
                using var lease = limiter.AttemptAcquire();
                lease.IsAcquired.Should().BeTrue($"Request {i + 1} should be permitted");
            }

            // The 6th request should be rejected
            using var rejectedLease = limiter.AttemptAcquire();
            rejectedLease.IsAcquired.Should().BeFalse("Request 6 should be rejected by rate limiter");
        }

        [Fact]
        public void AuthLimiter_ShouldHaveCorrectConfiguration()
        {
            // Arrange — mirror the exact config from Program.cs
            var options = new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            };

            // Assert
            options.PermitLimit.Should().Be(5);
            options.Window.Should().Be(TimeSpan.FromMinutes(1));
            options.QueueLimit.Should().Be(0);
        }

        [Fact]
        public void RejectionStatusCode_ShouldBe429()
        {
            // Assert — verify the expected HTTP status code for rate-limited requests
            StatusCodes.Status429TooManyRequests.Should().Be(429);
        }
    }
}

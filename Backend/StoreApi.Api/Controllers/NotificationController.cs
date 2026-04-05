using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.Entities;
using StoreSystem.Infrastructure.Persistence;

namespace StoreApi.Api.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/Notification")]
    [ApiVersion("1")]
    [Authorize(Roles = "Admin")]
    public class NotificationController : ApiControllerBase
    {
        private readonly AppDbContext _context;

        public NotificationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAll()
        {
            var notifications = await _context.Notifications
                .AsNoTracking()
                .OrderByDescending(n => n.CreatedAt)
                .Take(50)
                .ToListAsync();

            return Ok(notifications);
        }

        [HttpGet("Unread")]
        public async Task<IActionResult> GetUnreadCount()
        {
            var count = await _context.Notifications
                .CountAsync(n => !n.IsRead);

            return Ok(new { count });
        }

        [HttpPut("MarkAsRead/{id}")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
                return NotFound();

            notification.IsRead = true;
            await _context.SaveChangesAsync();
            return Ok("Notification marked as read.");
        }

        [HttpPut("MarkAllAsRead")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            await _context.Notifications
                .Where(n => !n.IsRead)
                .ExecuteUpdateAsync(s => s.SetProperty(n => n.IsRead, true));

            return Ok("All notifications marked as read.");
        }
    }
}

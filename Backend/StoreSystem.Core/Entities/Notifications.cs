using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.enums;

namespace StoreSystem.Core.Entities
{
    public class Notifications
    {
        public int Id { get; set; }
        
        public string Title { get; set; } = string.Empty;
        
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; } = false;
        public enNotificationType Type { get; set; } = enNotificationType.NewOrder;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? RelatedEntityId { get; set; }
        
        public string? RelatedEntityType { get; set; }
    }
}
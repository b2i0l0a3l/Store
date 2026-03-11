using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class AuditLog
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; }  = string.Empty;

        public string Endpoint { get; set; } = string.Empty;

        public string Method { get; set; } = string.Empty;

        public int StatusCode { get; set; }
        public string? IpAddress { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
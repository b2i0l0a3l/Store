using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public record ImageUploadResult
    {
        public string FileId { get; init; } = string.Empty;
        public string ImageUrl { get; init; } = string.Empty;
    }
}
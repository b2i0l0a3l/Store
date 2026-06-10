using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using StoreSystem.Core.Models;


namespace StoreSystem.Core.interfaces
{
    public interface IAppwriteStorageService
    {
        Task<ImageUploadResult?> UploadImageAsync(IFormFile file);
        Task<bool> DeleteImageAsync(string fileId);
        Task<ImageUploadResult?> UpdateImageAsync(string oldFileId, IFormFile newFile);
    }
}
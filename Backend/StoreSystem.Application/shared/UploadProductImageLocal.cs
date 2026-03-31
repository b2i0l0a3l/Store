using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Application.Interface;

namespace StoreSystem.Application.shared
{
    public class UploadProductImageLocal : IUploadProductImage
    {
        public async Task<string> Upload(Stream FileStream,string FileName)
        {
            var uploadDirectory = Directory.GetCurrentDirectory()+"/ProductImages";

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(FileName);
            var filePath = Path.Combine(uploadDirectory, fileName);

            if (!Directory.Exists(uploadDirectory))
            {
                Directory.CreateDirectory(uploadDirectory);
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await FileStream.CopyToAsync(stream);
            }
            return filePath;
        }
    }
}
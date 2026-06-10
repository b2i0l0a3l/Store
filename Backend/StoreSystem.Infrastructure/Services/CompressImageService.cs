using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Gif;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Infrastructure.Services
{
    public class CompressImageService : ICompressImage
    {
        public async Task<byte[]> CompressImage(IFormFile file)
        {
            using var image = await Image.LoadAsync(file.OpenReadStream());

            image.Mutate(x => x.Resize(new ResizeOptions
            {
                Mode = ResizeMode.Max,
                Size = new Size(1200, 1200)
            }));

            using var output = new MemoryStream();
            var extension = Path.GetExtension(file.FileName)?.ToLowerInvariant() ?? string.Empty;

            switch (extension)
            {
                case ".png":
                    await image.SaveAsPngAsync(output, new PngEncoder());
                    break;
                case ".jpg":
                case ".jpeg":
                    await image.SaveAsJpegAsync(output, new JpegEncoder { Quality = 80 });
                    break;
                
                default:
                    await image.SaveAsJpegAsync(output, new JpegEncoder { Quality = 80 });
                    break;
            }

            return output.ToArray();
        }
    }
}
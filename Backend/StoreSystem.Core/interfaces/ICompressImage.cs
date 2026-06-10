using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace StoreSystem.Core.interfaces
{
    public interface ICompressImage
    {
        Task<byte[]> CompressImage(IFormFile file);

    }
}
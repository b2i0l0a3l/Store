using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Application.Interface
{
    public interface IUploadProductImage
    {
        Task<string> Upload(Stream FileStream, string FileName);
    }
}
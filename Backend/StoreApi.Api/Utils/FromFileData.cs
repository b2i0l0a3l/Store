using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.interfaces;

namespace StoreApi.Api.Utils
{
    public class FormFileData : IFileData
    {
        private readonly IFormFile _file;

        public FormFileData(IFormFile file)
        {
            _file = file;
        }

        public Stream OpenReadStream() => _file.OpenReadStream();

        public string FileName => Path.GetFileName(_file.FileName);

    }
}
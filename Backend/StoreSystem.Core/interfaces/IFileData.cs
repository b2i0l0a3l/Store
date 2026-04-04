using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.interfaces
{
    public interface IFileData
    {
        Stream OpenReadStream();
        string FileName { get; }
    }
}
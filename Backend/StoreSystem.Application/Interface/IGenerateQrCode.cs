using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Application.Interface
{
    public interface IGenerateQrCode
    {
        string GenerateQrCode(string text);

    }
}
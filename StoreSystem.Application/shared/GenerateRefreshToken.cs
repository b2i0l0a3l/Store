using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using StoreSystem.Application.Interface;

namespace StoreSystem.Application.shared
{
    public class GenerateRefreshToken : IGenerateRefreshToken
    {
        public string Generate()
        {
            var bytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(bytes);
            return Convert.ToBase64String(bytes);
        }
    }
}
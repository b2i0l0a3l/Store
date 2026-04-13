using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using StoreSystem.Application.Interface;

namespace StoreSystem.Application.shared
{
    public class GenerateRefreshToken : IGenerateToken
    {
        public string Generate(int byteLength)
        {
            var bytes = new byte[byteLength];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(bytes);
            return Convert.ToBase64String(bytes);
        }
    }
}
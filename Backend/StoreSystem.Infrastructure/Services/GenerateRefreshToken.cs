using System.Security.Cryptography;
using StoreSystem.Application.Interface;

namespace StoreSystem.Infrastructure.Services
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

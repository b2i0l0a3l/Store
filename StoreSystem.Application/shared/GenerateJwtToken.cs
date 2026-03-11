using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StoreSystem.Application.Interface;

namespace StoreSystem.Application.shared
{
    public class GenerateJwtToken(IConfiguration _Configuration) : IGenerateJwtToken
    {
        public  string Generate(Claim[] claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Configuration["JWT_SECRET"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _Configuration["JWT_VALID_ISSUER"]!,
                audience: _Configuration["JWT_VALID_AUDIENCE"]!,
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
       
        
    }
}
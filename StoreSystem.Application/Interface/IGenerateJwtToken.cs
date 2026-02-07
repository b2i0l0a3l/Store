using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;


namespace StoreSystem.Application.Interface
{
    public interface IGenerateJwtToken
    {
        string Generate(Claim[] claims);
    }
}
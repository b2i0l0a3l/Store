using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Models.UserModels;

namespace StoreSystem.Core.interfaces
{
    public interface IUserRepository
    {
        public Task<Result<IEnumerable<UserModel>>> GetAllUsers();
    }
}
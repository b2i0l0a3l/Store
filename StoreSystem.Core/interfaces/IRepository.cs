using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using StoreSystem.Core.common;

namespace StoreSystem.Core.interfaces
{
    public interface IRepository<T> where T :class
    {
        Task<Result<T>> Add(T Entity);
        Task<Result<bool>> Delete(int Id);
        Task<Result<bool>> Update(int Id, Action<T> UpdateAction);
        Task<Result<T?>> GetById(int Id);
        Task<Result<T?>> GetByCondition(Expression<Func<T, bool>> exp);
        Task<Result<PagedResult<T>?>> GetAll(int pageNumber, int pageSize);
        Task<int> Save();
    }
}
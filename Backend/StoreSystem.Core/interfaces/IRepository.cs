using StoreSystem.Core.common;
using StoreSystem.Core.Entities;

namespace StoreSystem.Core.interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<Result<int>> Add(T entity);
        Task<Result> AddRange(IEnumerable<T> entities);
        Task<Result<bool>> Update(int id, Action<T> updateAction);
        Task<Result<bool>> Delete(int id);
    }
}
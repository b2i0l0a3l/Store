using System.Linq.Expressions;
using StoreSystem.Core.common;

namespace StoreSystem.Core.interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<Result<int>> Add(T Entity);
        Task<Result> AddRange(IEnumerable<T> entities);
        Task<Result<bool>> Delete(int Id);
        Task<Result<bool>> Update(int Id, Action<T> UpdateAction);

        /// <summary>Get a single projected result by primary key.</summary>
        Task<Result<TResult>> GetById<TResult>(int Id, Expression<Func<T, TResult>> projection);

        /// <summary>Get a single projected result matching a condition.</summary>
        Task<Result<TResult>> GetByCondition<TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> projection);

        /// <summary>Get paged projected results.</summary>
        Task<Result<PagedResult<TResult>>> GetAll<TResult>(int pageNumber, int pageSize, Expression<Func<T, TResult>> projection);

        /// <summary>Get paged projected results matching a predicate.</summary>
        Task<Result<PagedResult<TResult>>> GetAllById<TResult>(int pageNumber, int pageSize, Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> projection);

        /// <summary>Get all projected results without paging.</summary>
        Task<Result<IEnumerable<TResult>>> All<TResult>(Expression<Func<T, TResult>> projection);
    }
}
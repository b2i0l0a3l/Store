using System.Linq.Expressions;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;

namespace StoreSystem.Core.interfaces
{
    public interface IQueryService<T> where T : BaseEntity
    {
        Task<Result<TResult>> FindById<TResult>(int id, Expression<Func<T, TResult>> projection);
        Task<Result<TResult>> FindOneSingle<TResult>(Expression<Func<T, bool>> exp, Expression<Func<T, TResult>> projection);
        Task<Result<TResult>> FindOne<TResult>(
            Expression<Func<T, bool>> predicate,
            Expression<Func<T, TResult>> projection);

        Task<Result<PagedResult<TResult>>> GetPaged<TResult>(
            int pageNumber,
            int pageSize,
            Expression<Func<T, TResult>> projection,
            Expression<Func<T, bool>>? filter = null,
            Expression<Func<T, object>>? orderBy = null);

        Task<Result<IReadOnlyList<TResult>>> GetAll<TResult>(
            Expression<Func<T, TResult>> projection,
            Expression<Func<T, bool>>? filter = null);

        Task<Result<bool>> Exists(Expression<Func<T, bool>> predicate);
    }
}

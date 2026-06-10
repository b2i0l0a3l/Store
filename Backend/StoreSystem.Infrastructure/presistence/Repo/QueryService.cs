using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Infrastructure.Persistence.Repo
{
    public class QueryService<T> : IQueryService<T> where T : BaseEntity
    {
        private readonly IQueryable<T> _query;

        public QueryService(AppDbContext context)
        {
            _query = context.Set<T>().AsNoTracking();
        }

        public async Task<Result<TResult>> FindOneSingle<TResult>(Expression<Func<T,bool>> exp, Expression<Func<T, TResult>> projection)
        {
            try
            {
                var result = await _query.Where(exp).Select(projection).SingleOrDefaultAsync();
                if (result == null) return Errors.DataNotFoundError;
                return result;
                
            }catch (Exception ex)
            {
                return new Error("QueryFailed", ErrorType.General, ex.Message);
            }
        }
        public async Task<Result<TResult>> FindById<TResult>(int id, Expression<Func<T, TResult>> projection)
        {
            try
            {
                var result = await _query
                    .Where(e => e.Id == id)
                    .Select(projection)
                    .FirstOrDefaultAsync();

                if (result is null)
                    return new Error("NotFound", ErrorType.NotFound, "Entity not found.");

                return Result<TResult>.Success(result);
            }
            catch (Exception ex)
            {
                return new Error("QueryFailed", ErrorType.General, ex.Message);
            }
        }

        public async Task<Result<TResult>> FindOne<TResult>(
            Expression<Func<T, bool>> predicate,
            Expression<Func<T, TResult>> projection)
        {
            try
            {
                var result = await _query
                    .Where(predicate)
                    .Select(projection)
                    .FirstOrDefaultAsync();

                if (result is null)
                    return new Error("NotFound", ErrorType.NotFound, "Entity not found.");

                return Result<TResult>.Success(result);
            }
            catch (Exception ex)
            {
                return new Error("QueryFailed", ErrorType.General, ex.Message);
            }
        }

        public async Task<Result<PagedResult<TResult>>> GetPaged<TResult>(
            int pageNumber,
            int pageSize,
            Expression<Func<T, TResult>> projection,
            Expression<Func<T, bool>>? filter = null,Expression<Func<T, object>>? orderBy = null)
        {
            try
            {
                var source = filter is not null ? _query.Where(filter) : _query;
                if (orderBy is not null)
                {
                    source = source.OrderByDescending(orderBy);
                }                
                var totalItems = await source.CountAsync();
                if (totalItems == 0)
                    return new Error("NotFound", ErrorType.NotFound, "No records found.");

                var items = await source
                    .Select(projection)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return Result<PagedResult<TResult>>.Success(new PagedResult<TResult>
                {
                    Items = items,
                    TotalItems = totalItems,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                });
            }
            catch (Exception ex)
            {
                return new Error("QueryFailed", ErrorType.General, ex.Message);
            }
        }

        public async Task<Result<IReadOnlyList<TResult>>> GetAll<TResult>(
            Expression<Func<T, TResult>> projection,
            Expression<Func<T, bool>>? filter = null)
        {
            try
            {
                var source = filter is not null ? _query.Where(filter) : _query;

                var items = await source
                    .Select(projection)
                    .ToListAsync();

                if (items.Count == 0)
                    return new Error("NotFound", ErrorType.NotFound, "No records found.");

                return Result<IReadOnlyList<TResult>>.Success(items);
            }
            catch (Exception ex)
            {
                return new Error("QueryFailed", ErrorType.General, ex.Message);
            }
        }

        public async Task<Result<bool>> Exists(Expression<Func<T, bool>> predicate)
        {
            try
            {
                var exists = await _query.AnyAsync(predicate);
                return exists;
            }
            catch (Exception ex)
            {
                return new Error("QueryFailed", ErrorType.General, ex.Message);
            }
        }
    }
}

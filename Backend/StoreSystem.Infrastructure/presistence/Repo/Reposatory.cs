using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Infrastructure.Persistence.Repo
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly AppDbContext _Context;
        protected DbSet<T> _Set;

        public Repository(AppDbContext context)
        {
            _Context = context;
            _Set = _Context.Set<T>();
        }

        // ─── Write Operations ────────────────────────────────────────────────

        public async Task<Result<int>> Add(T Entity)
        {
            try
            {
                await _Set.AddAsync(Entity);
                await _Context.SaveChangesAsync();
                var idProp = typeof(T).GetProperty("Id");
                int id = idProp != null ? (int)(idProp.GetValue(Entity) ?? 0) : 0;
                return id;
            }
            catch
            {
                return new Error("AddFailed", ErrorType.Failure, "A database error occurred.");
            }
        }

        public async Task<Result> AddRange(IEnumerable<T> entities)
        {
            try
            {
                await _Set.AddRangeAsync(entities);
                await _Context.SaveChangesAsync();
                return Result.Success();
            }
            catch
            {
                return new Error("AddRangeFailed", ErrorType.Failure, "A database error occurred during bulk insert.");
            }
        }

        public async Task<Result<bool>> Delete(int Id)
        {
            try
            {
                var entity = await _Set.FindAsync(Id);
                if (entity == null) return new Error("DeleteFailed", ErrorType.NotFound, "Entity Not Found");
                _Set.Remove(entity);
                await _Context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return new Error("DeleteFailed", ErrorType.Failure, "A database error occurred.");
            }
        }

        public async Task<Result<bool>> Update(int Id, Action<T> UpdateAction)
        {
            try
            {
                var entity = await _Set.FindAsync(Id);
                if (entity == null) return new Error("UpdateFailed", ErrorType.NotFound, "Entity Not Found");
                UpdateAction(entity);
                await _Context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return new Error("UpdateFailed", ErrorType.General, ex.Message);
            }
        }

        // ─── Single-Entity Queries ───────────────────────────────────────────

        public async Task<Result<TResult>> GetById<TResult>(int Id, Expression<Func<T, TResult>> projection)
        {
            try
            {
                var result = await _Set.AsNoTracking()
                    .Where(e => EF.Property<int>(e, "Id") == Id)
                    .Select(projection)
                    .FirstOrDefaultAsync();

                if (result == null) return new Error("NotFound", ErrorType.NotFound, "Entity Not Found");
                return Result<TResult>.Success(result);
            }
            catch (Exception ex)
            {
                return new Error("GetByIdFailed", ErrorType.General, ex.Message);
            }
        }

        public async Task<Result<TResult>> GetByCondition<TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> projection)
        {
            try
            {
                var result = await _Set.AsNoTracking()
                    .Where(predicate)
                    .Select(projection)
                    .FirstOrDefaultAsync();

                if (result == null) return new Error("NotFound", ErrorType.NotFound, "Entity Not Found");
                return Result<TResult>.Success(result);
            }
            catch
            {
                return new Error("GetFailed", ErrorType.Failure, "A database error occurred.");
            }
        }

        // ─── Paged Queries ───────────────────────────────────────────────────

        public async Task<Result<PagedResult<TResult>>> GetAll<TResult>(int pageNumber, int pageSize, Expression<Func<T, TResult>> projection)
        {
            try
            {
                int totalItems = await _Set.CountAsync();
                if (totalItems <= 0) return new Error("NotFound", ErrorType.NotFound, "No records found.");

                List<TResult> items = await _Set.AsNoTracking()
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
            catch
            {
                return new Error("GetFailed", ErrorType.Failure, "A database error occurred.");
            }
        }

        public async Task<Result<PagedResult<TResult>>> GetAllById<TResult>(int pageNumber, int pageSize, Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> projection)
        {
            try
            {
                int totalItems = await _Set.Where(predicate).CountAsync();
                if (totalItems <= 0) return new Error("NotFound", ErrorType.NotFound, "No records found.");

                List<TResult> items = await _Set.AsNoTracking()
                    .Where(predicate)
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
            catch
            {
                return new Error("GetFailed", ErrorType.Failure, "A database error occurred.");
            }
        }

        // ─── Full-List Query ─────────────────────────────────────────────────

        public async Task<Result<IEnumerable<TResult>>> All<TResult>(Expression<Func<T, TResult>> projection)
        {
            try
            {
                List<TResult> items = await _Set.AsNoTracking()
                    .Select(projection)
                    .ToListAsync();

                if (items.Count == 0) return new Error("NotFound", ErrorType.NotFound, "No records found.");
                return Result<IEnumerable<TResult>>.Success(items);
            }
            catch
            {
                return new Error("AllFailed", ErrorType.Failure, "A database error occurred.");
            }
        }
    }
}
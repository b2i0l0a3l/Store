using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Infrastructure.Persistence.Repo
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly AppDbContext _context;
        private readonly DbSet<T> _set;

        public Repository(AppDbContext context)
        {
            _context = context;
            _set = _context.Set<T>();
        }

        public async Task<Result<int>> Add(T entity)
        {
            try
            {
                await _set.AddAsync(entity);
                await _context.SaveChangesAsync();
                return entity.Id;
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
                await _set.AddRangeAsync(entities);
                await _context.SaveChangesAsync();
                return Result.Success();
            }
            catch
            {
                return new Error("AddRangeFailed", ErrorType.Failure, "A database error occurred.");
            }
        }

        public async Task<Result<bool>> Update(int id, Action<T> updateAction)
        {
            try
            {
                var entity = await _set.FindAsync(id);
                if (entity is null)
                    return new Error("NotFound", ErrorType.NotFound, "Entity not found.");
                updateAction(entity);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return new Error("UpdateFailed", ErrorType.General, ex.Message);
            }
        }

        public async Task<Result<bool>> Delete(int id)
        {
            try
            {
                var entity = await _set.FindAsync(id);
                if (entity is null)
                    return new Error("NotFound", ErrorType.NotFound, "Entity not found.");
                _set.Remove(entity);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return new Error("DeleteFailed", ErrorType.Failure, "A database error occurred.");
            }
        }
    }
}
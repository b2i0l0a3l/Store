using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using Microsoft.EntityFrameworkCore;

using StoreSystem.Infrastructure.Persistence;
using Microsoft.Extensions.Logging;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.enums;

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

        public async Task<Result<T>> Add(T Entity)
        {
            try
            {
                await _Set.AddAsync(Entity);
                return Entity;
            }
            catch (Exception ex)
            {
                return new Error("AddFailed",ErrorType.General,ex.Message);
            }
        }


        public async Task<Result<bool>> Delete(int Id)
        {
            try
            {
                var result = await findAsync(Id);
                if (result == null) return new Error("DeleteFaild",ErrorType.General,"Entity Not Found");;
                _Set.Remove(result);
                return true;
            }catch(Exception ex)
            {

                return new Error("DeleteFaild",ErrorType.General,ex.Message);
            }
        }

        public async Task<Result<PagedResult<T>?>> GetAll(int pageNumber , int pageSize)
        {
            try
            {
                int TotoalItems = await _Set.CountAsync();
                if (TotoalItems <= 0) return new Error("GetFaild", ErrorType.General, "Entity Not Found");
                
                List<T> items = await _Set.AsNoTracking()
                .Skip((pageNumber - 1) * pageSize).
                Take(pageSize).ToListAsync();
                
                return new PagedResult<T>
                {
                    Items = items,
                    TotalItems = TotoalItems,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                };
            }catch(Exception ex)
            {
                return new Error("GetFaild",ErrorType.General,ex.Message);
            }
        }

        public async Task<Result<T?>> GetByCondition(Expression<Func<T, bool>> exp)
        {
            try
            {
                var result = await _Set.FirstOrDefaultAsync(exp);
                if (result == null) return new Error("GetFaild",ErrorType.General,"Entity Not Found");
                return result;
            }catch(Exception ex)
            {
                return new Error("GetFaild",ErrorType.General,ex.Message);
            }
        }

        public async Task<Result<T?>> GetById(int Id)
        {
            try
            {
                var result = await findAsync(Id);
                if (result == null) return new Error("GetByIdFaild",ErrorType.General,"Entity Not Found");;
                return result;
            }catch(Exception ex)
            {
                return new Error("GetByIdFaild",ErrorType.General,ex.Message);;
            }
        }

        public async Task<Result<bool>> Update(int Id, Action<T> UpdateAction)
        {
            try
            {
                var result = await findAsync(Id);
                if (result == null) return new Error("UpdateFaild", ErrorType.General, "Entity Not Found"); ;
                UpdateAction(result);

                return true;
            }
            catch (Exception ex)
            {
                return new Error("UpdateFaild", ErrorType.General, ex.Message); ;
            }
        }
      
        private async Task<T?> findAsync(int Id)
        => await _Set.FindAsync(Id);
        public async Task<int> Save()
         => await _Context.SaveChangesAsync();

     
    }
}
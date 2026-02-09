using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Infrastructure.Persistence;
using StoreSystem.Infrastructure.Persistence.Repo;

namespace StoreSystem.Infrastructure.presistence.Repo
{
    public class OrderWithItemRepo : IOrderWithItemRepo
    {
        private readonly AppDbContext _Context;
        public OrderWithItemRepo(AppDbContext c)
        {
            _Context = c;
        }
        public async Task<Result> AddRange(IEnumerable<OrderItem> Entities)
        {
            try
            {
                _Context.ChangeTracker.AutoDetectChangesEnabled = false;
                await _Context.OrderItems.AddRangeAsync(Entities);
                await _Context.SaveChangesAsync();
                return Result.Success();
            }
            catch (Exception ex)
            {
                return new Error("AddRangeFailed",ErrorType.General,ex.Message);
            }
            finally
            {
                _Context.ChangeTracker.AutoDetectChangesEnabled = true;
            }
        }

        public async Task<Result> UpdateRange(IEnumerable<OrderItem> Entities)
        {
             try
            {
                _Context.ChangeTracker.AutoDetectChangesEnabled = false;
                _Context.OrderItems.UpdateRange(Entities);
                await _Context.SaveChangesAsync();
                return Result.Success();
            }
            catch (Exception ex)
            {
                return new Error("AddRangeFailed",ErrorType.General,ex.Message);
            }
            finally
            {
                _Context.ChangeTracker.AutoDetectChangesEnabled = true;
            }
        }
    }
}
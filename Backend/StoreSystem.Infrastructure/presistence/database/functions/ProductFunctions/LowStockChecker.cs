using Microsoft.EntityFrameworkCore;
using StoreSystem.Application.Interface;
using StoreSystem.Core.Entities;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.ProductFunctions
{
    public class LowStockChecker : ILowStockChecker
    {
        private readonly AppDbContext _context;

        public LowStockChecker(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetLowStockProducts(List<int> productIds, int threshold)
        {
            return await _context.Products
                .AsNoTracking()
                .Where(p => productIds.Contains(p.Id) && p.Quantity <= threshold)
                .ToListAsync();
        }
    }
}

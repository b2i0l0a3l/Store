using StoreSystem.Core.Entities;

namespace StoreSystem.Application.Interface
{
    public interface ILowStockChecker
    {
        Task<List<Product>> GetLowStockProducts(List<int> productIds, int threshold);
    }
}

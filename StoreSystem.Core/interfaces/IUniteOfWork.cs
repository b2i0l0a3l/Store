using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.Entities;

namespace StoreSystem.Core.interfaces
{
    public interface IUniteOfWork : IDisposable
    {
        IRepository<Product> Product { get; }
        IRepository<Order> Order {get;}
        IRepository<Debt> Debt {get;}
        IRepository<Payment> Payment {get;}
        IRepository<OrderItem> OrderItem { get; }
        IRepository<SupplierProduct> SupplierProduct { get; }
        IRepository<Return> Return { get; }
        IRepository<ReturnItem> ReturnItem { get; }
        IRepository<RefreshToken> RefreshTokenRepo { get; }
        IOrderWithItemRepo OrderWithItemRepo { get; }
        Task BeginTransactionAsync(CancellationToken cancellationToken = default);
        Task CommitAsync(CancellationToken cancellationToken = default);
        Task RollbackAsync(CancellationToken cancellationToken = default);
        Task SaveAsync(CancellationToken cancellationToken = default);
    }
}
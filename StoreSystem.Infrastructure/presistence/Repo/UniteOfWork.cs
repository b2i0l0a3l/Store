using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Infrastructure.Persistence;
using StoreSystem.Infrastructure.Persistence.Repo;

namespace StoreSystem.Infrastructure.presistence.Repo
{
    public class UniteOfWork : IUniteOfWork
    {
        private readonly AppDbContext _Context;
        public IRepository<Order> Order {get;}
        public IRepository<Debt> Debt { get; }
        public IRepository<Product> Product { get; }
        public IOrderWithItemRepo OrderWithItemRepo { get; }
         private IDbContextTransaction? _transaction;

        public IRepository<OrderItem> OrderItem { get; }

        public IRepository<Payment> Payment { get; }

        public IRepository<SupplierProduct> SupplierProduct { get; }
        public IRepository<Return> Return { get; }
        public IRepository<ReturnItem> ReturnItem { get; }
        public IRepository<RefreshToken> RefreshTokenRepo { get; }

        public UniteOfWork(AppDbContext context)
        {
            _Context = context;
            Order = new Repository<Order>(_Context);
            OrderItem = new Repository<OrderItem>(_Context);
            Product = new Repository<Product>(_Context);
            Debt = new Repository<Debt>(_Context);
            OrderWithItemRepo = new OrderWithItemRepo(_Context);
            Payment = new Repository<Payment>(_Context); 
            SupplierProduct = new Repository<SupplierProduct>(_Context);
            Return = new Repository<Return>(_Context);
            ReturnItem = new Repository<ReturnItem>(_Context);
            RefreshTokenRepo = new Repository<RefreshToken>(_Context);

        }

        public async Task SaveAsync(CancellationToken cancellationToken = default)
        {
             await _Context.SaveChangesAsync(cancellationToken);
        }
        public void Dispose()
        {
            _transaction?.Dispose();
            _Context.Dispose();

        }

        public async Task BeginTransactionAsync(CancellationToken cancellationToken = default)
        {
            if (_transaction == null)
            _transaction = await _Context.Database.BeginTransactionAsync(cancellationToken);

        }

        public async Task CommitAsync(CancellationToken cancellationToken = default)
        {
            if (_transaction == null)
            return;

            await _Context.SaveChangesAsync(cancellationToken);
            await _transaction.CommitAsync(cancellationToken);
            await _transaction.DisposeAsync();
            _transaction = null;
        }

        public async Task RollbackAsync(CancellationToken cancellationToken = default)
        {
            if (_transaction == null)
                return;

            await _transaction.RollbackAsync(cancellationToken);
            await _transaction.DisposeAsync();
            _transaction = null;
        }

        
    }
}
using System.Data;
using Dapper;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces.functions;
using StoreSystem.Core.Models.ProductModels;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.ProductFunctions
{
    public class GetAllProducts : IGetAllProductsFunction
    {
        private readonly AppDbContext _Context;
        public GetAllProducts(AppDbContext context) => _Context = context;
        public async Task<Result<IEnumerable<GetAllProductModel>>> handle()
        {
             var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            try
            {
                var result = await connection.QueryAsync<GetAllProductModel>("select * from fn_get_all_product()");
                List<GetAllProductModel> list = result.ToList();
                if (list.Count == 0) return Errors.DataNotFoundError;
                return list;
            }
            catch (Exception ex)
            {
                return new Error("GetProductsERROR", ErrorType.General, ex.Message);
            }
        }
    }
}
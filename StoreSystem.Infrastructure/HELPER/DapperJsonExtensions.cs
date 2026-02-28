using System.Data;
using System.Text.Json;
using Dapper;
using Npgsql;
using NpgsqlTypes;

namespace StoreSystem.Infrastructure.HELPER
{
    public class JsonbParameter : SqlMapper.ICustomQueryParameter
    {
        private readonly string _json;

        public JsonbParameter(string json)
        {
            _json = json;
        }

        public void AddParameter(IDbCommand command, string name)
        {
            var parameter = new NpgsqlParameter(name, NpgsqlDbType.Jsonb)
            {
                Value = _json
            };
            command.Parameters.Add(parameter);
        }
    }

    public static class DapperJsonExtensions
    {
        public static void AddJsonb(
            this DynamicParameters parameters,
            string name,
            object value)
        {
            var json = value is string s ? s : JsonSerializer.Serialize(value);
            parameters.Add(name, new JsonbParameter(json));
        }
    }
}
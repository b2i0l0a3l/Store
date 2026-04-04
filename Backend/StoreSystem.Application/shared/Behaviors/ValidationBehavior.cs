using FluentValidation;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StoreSystem.Application.Common.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (!_validators.Any())
            {
                return await next();
            }
            var context = new ValidationContext<TRequest>(request);

            var validationResults = await Task.WhenAll(
                _validators.Select(v => v.ValidateAsync(context, cancellationToken)));

            var failures = validationResults
                .SelectMany(r => r.Errors)
                .Where(f => f != null)
                .ToList();

            if (failures.Count != 0)
            {
                var errorMessage = string.Join("; ", failures.Select(f => f.ErrorMessage));
                var error = new StoreSystem.Core.common.Error("ValidationError", StoreSystem.Core.enums.ErrorType.Validation, errorMessage);

                if (typeof(TResponse).IsGenericType &&
                    typeof(TResponse).GetGenericTypeDefinition() == typeof(StoreSystem.Core.common.Result<>))
                {
                    var method = typeof(TResponse).GetMethod("op_Implicit", new[] { typeof(StoreSystem.Core.common.Error) });
                    if (method != null)
                    {
                        return (TResponse)method.Invoke(null, new object[] { error })!;
                    }
                }
                else if (typeof(TResponse) == typeof(StoreSystem.Core.common.Result))
                {
                    return (TResponse)(object)StoreSystem.Core.common.Result.Failure(error);
                }

                throw new ValidationException(failures);
            }

            return await next();
        }
    }
}

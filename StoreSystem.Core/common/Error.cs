using StoreSystem.Core.enums;

namespace StoreSystem.Core.common
{


    public record Error(string Id, ErrorType Type, string Description);

    public static class Errors
    {
        public static Error UserNotFoundError { get; } = new("UserNotFound", ErrorType.NotFound, "User Not Found.");
        public static Error EmailAlreadyExistsError { get; } = new("EmailFoundError", ErrorType.General, "Email already exists.");
        public static Error DataNotFoundError { get; } = new("NoRecordFound", ErrorType.General, "No Record Found.");
        public static Error InvalidCredError { get; } = new("InvalidCredError", ErrorType.General, "Invalid Credintial.");
       
    }
}

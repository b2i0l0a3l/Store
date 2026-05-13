namespace StoreSystem.Application.Interface
{
    public interface IBackgroundTaskQueue
    {
        ValueTask EnqueueAsync(Func<IServiceProvider, CancellationToken, Task> workItem);
        ValueTask<Func<IServiceProvider, CancellationToken, Task>> DequeueAsync(CancellationToken cancellationToken);
    }
}

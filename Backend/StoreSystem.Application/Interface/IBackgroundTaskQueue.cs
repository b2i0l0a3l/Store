using System.Threading.Channels;

namespace StoreSystem.Application.Interface
{
    public interface IBackgroundTaskQueue
    {
        ValueTask EnqueueAsync(Func<IServiceProvider, CancellationToken, Task> workItem);
        ValueTask<Func<IServiceProvider, CancellationToken, Task>> DequeueAsync(CancellationToken cancellationToken);
    }

    public class BackgroundTaskQueue : IBackgroundTaskQueue
    {
        private readonly Channel<Func<IServiceProvider, CancellationToken, Task>> _queue;

        public BackgroundTaskQueue(int capacity = 100)
        {
            _queue = Channel.CreateBounded<Func<IServiceProvider, CancellationToken, Task>>(
                new BoundedChannelOptions(capacity)
                {
                    FullMode = BoundedChannelFullMode.Wait
                });
        }

        public async ValueTask EnqueueAsync(Func<IServiceProvider, CancellationToken, Task> workItem)
        {
            await _queue.Writer.WriteAsync(workItem);
        }

        public async ValueTask<Func<IServiceProvider, CancellationToken, Task>> DequeueAsync(CancellationToken cancellationToken)
        {
            return await _queue.Reader.ReadAsync(cancellationToken);
        }
    }
}

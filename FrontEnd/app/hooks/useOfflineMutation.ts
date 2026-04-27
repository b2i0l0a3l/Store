import { db, SyncOperation } from '../../util/db';
import { toast } from '../../store/useToastStore';

interface OfflineMutationOptions<T, P> {
  type: SyncOperation['type'];
  payload: P;
  apiCall: (payload: P) => Promise<{ succeeded: boolean; message?: string; value?: T }>;
  onSuccess?: (data?: T) => void;
  onError?: (error: string) => void;
  localDbUpdate?: () => Promise<void>; // Optional: to eagerly update IndexedDB table
}

export async function executeOfflineMutation<T, P>({
  type,
  payload,
  apiCall,
  onSuccess,
  onError,
  localDbUpdate
}: OfflineMutationOptions<T, P>) {
  try {
    if (!navigator.onLine) {
      await db.syncQueue.add({
        type,
        payload,
        createdAt: new Date(),
        status: 'pending'
      });
      
      if (localDbUpdate) {
        await localDbUpdate();
      }

      toast.success("Saved offline. Will sync when online.");
      if (onSuccess) onSuccess();
      return { succeeded: true, offline: true };
    }

    const res = await apiCall(payload);
    if (res.succeeded) {
      toast.success(res.message || "Operation successful");
      if (localDbUpdate) {
        await localDbUpdate();
      }
      if (onSuccess) onSuccess(res.value);
      return res;
    } else {
      toast.error(res.message || "Operation failed");
      if (onError) onError(res.message || "Operation failed");
      return { succeeded: false, message: res.message };
    }
  } catch (error: any) {
    console.error(`Offline mutation error [${type}]:`, error);
    toast.error("Operation failed");
    if (onError) onError(error.message || "Operation failed");
    return { succeeded: false, message: error.message };
  }
}

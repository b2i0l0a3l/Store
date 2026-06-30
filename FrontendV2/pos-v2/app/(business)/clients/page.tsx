import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { getClientsPaginated } from "@/features/Clients/actions";
import ClientsClient from "@/features/Clients/components/ClientsClient";

export default async function ClientsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["clients", 1],
    queryFn: async () => {
      const result = await getClientsPaginated(1, 10);
      if (!result.isSuccess) throw new Error(result.message);
      return result.value;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientsClient />
    </HydrationBoundary>
  );
}

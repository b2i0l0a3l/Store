"use client";
import { UsersIcon } from "@heroicons/react/24/solid";
import CardSection from "@/app/components/Ui/Card/Card";
import CustomSearch from "@/app/components/Ui/Search/CustomSearch";
import ClientTable from "./Table/ClientTable";
import { client } from "@/app/Features/clients/types";
import { useCallback, useMemo, useState } from "react";
import AddClientButton from "./Buttons/AddClientButton";
import { useClientStore } from "@/app/Features/clients/store/client";

export default function ClientSection({ data }: { data: client[] }) {
  const [search, setSearch] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const updatedClients = useClientStore((state) => state.updatedClients);
  const deletedClientIds = useClientStore((state) => state.deletedClientIds);

  const filteredData = useMemo(() => {
    let currentData = data;
    if (deletedClientIds.size > 0) {
      currentData = currentData.filter((c) => !deletedClientIds.has(c.id));
    }

    const searchLower = search.toLowerCase();
    return currentData
      .filter((c) => {
        const actualClient = updatedClients[c.id] || c;
        return actualClient.name.toLowerCase().includes(searchLower);
      })
      .map((c) => updatedClients[c.id] || c);
  }, [data, search, updatedClients, deletedClientIds]);

  return (
    <>
      <CardSection title="Clients" icon={UsersIcon}>
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
          <CustomSearch onSearch={handleSearch} />
          <AddClientButton />
        </div>

        <ClientTable data={filteredData} />
      </CardSection>
    </>
  );
}

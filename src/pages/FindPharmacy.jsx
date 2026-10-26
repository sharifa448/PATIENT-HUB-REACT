
import React, { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import MedicineCard from "../components/MedicineCard";
import {
  medicineCards,
  medicineTable,
} from "../data/pharmacies";
import {
  Search,
  X,
  ChevronDown,
  ArrowUpDown,
  Pill,
  PackageSearch,
} from "lucide-react";

const normalize = (value) =>
  String(value ?? "").trim().toLowerCase();

const FindPharmacy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [sortOrder, setSortOrder] = useState("asc");

  const search = normalize(searchTerm);

  const filteredCards = useMemo(() => {
    return medicineCards.filter((item) =>
      [
        item.name,
        item.pharmacy,
        item.description,
        item.price,
      ].some((value) => normalize(value).includes(search))
    );
  }, [search]);

  const filteredTable = useMemo(() => {
    const results = medicineTable.filter((item) =>
      [
        item.name,
        item.serviceBy,
        item.category,
        item.code,
        item.price,
        item.discount,
      ].some((value) => normalize(value).includes(search))
    );

    return [...results].sort((a, b) => {
      const result = normalize(a.name).localeCompare(
        normalize(b.name)
      );

      return sortOrder === "asc" ? result : -result;
    });
  }, [search, sortOrder]);

 

  const paginatedTable = sortedTable.slice(0, entriesPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  
  const handleBuyNow = (item) => {
    setSelectedItem(item);
    setPurchaseSuccess(false);
    setIsCheckoutOpen(true);
  };


  const handleConfirmPurchase = () => {
    setPurchaseSuccess(true);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setSelectedItem(null);
    }, 2000);
  };


  return (
    <DashboardLayout title="Find Pharmacy">
      <main className="min-h-screen bg-gray-50/70 p-4 sm:p-6 lg:p-8">
        <header className="mb-7 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
            <Pill size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Find Pharmacy
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Search medicines and explore pharmacy listings.
            </p>
          </div>
        </header>

        <section className="mb-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold text-gray-800">
            Search Medicines
          </h2>

          <p className="mt-1 mb-5 text-sm text-gray-500">
            Search by medicine name, pharmacy, category or ID.
          </p>

          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Try Esomeprazole or Carry Medical..."
              aria-label="Search medicines"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 hover:bg-gray-200"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-purple-50 px-3 py-1.5 text-purple-700">
              {filteredCards.length} medicine cards
            </span>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-700">
              {filteredTable.length} table results
            </span>
          </div>
        </section>

        <section className="mb-7">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Featured Medicines
          </h2>

          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCards.map((item) => (
                <MedicineCard
                  key={item.id}
                  data={item}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed bg-white px-5 py-10 text-center">
              <PackageSearch
                size={36}
                className="mx-auto mb-3 text-gray-400"
              />
              <p className="font-semibold text-gray-800">
                No medicines found
              </p>
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-white"
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <h2 className="text-lg font-bold text-gray-900">
              Medicine Directory
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredTable.length} results
            </p>
          </div>

          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-sm text-gray-600">
              Show
              <span className="relative">
                <select
                  value={entriesPerPage}
                  onChange={(event) =>
                    setEntriesPerPage(Number(event.target.value))
                  }
                  className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9"
                >
                  <option value={7}>7</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                />
              </span>
              entries
            </label>


            <button
              type="button"
              onClick={() =>
                setSortOrder((current) =>
                  current === "asc" ? "desc" : "asc"
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-purple-50"
            >
              <ArrowUpDown size={16} />
              Sort: {sortOrder === "asc" ? "A–Z" : "Z–A"}
            </button>
          </div>
 
 

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4">Medicine</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Pharmacy</th>
                  <th className="px-5 py-4">Discount</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">ID</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedTable.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-4 font-semibold">
                      {item.name}
                    </td>
                    <td className="px-5 py-4">
                      {item.category || "—"}
                    </td>
                    <td className="px-5 py-4">
                      {item.serviceBy || "—"}
                    </td>
                    <td className="px-5 py-4">
                      {item.discount ?? "—"}
                    </td>
                    <td className="px-5 py-4 font-semibold">
                      {item.price != null
                        ? `RM ${item.price}`
                        : "—"}
                    </td>
                    <td className="px-5 py-4">
                      {item.code || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {paginatedTable.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-gray-100 p-4"
              >
                <h3 className="font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {item.serviceBy}
                </p>
                <p className="mt-2 font-bold text-purple-700">
                  {item.price != null
                    ? `RM ${item.price}`
                    : "Price unavailable"}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {item.category} · {item.code}
                </p>
              </article>
            ))}
          </div>

          {paginatedTable.length === 0 && (
            <div className="px-5 py-10 text-center">
              <PackageSearch
                size={32}
                className="mx-auto mb-3 text-gray-400"
              />
              <p className="font-semibold text-gray-800">
                No results found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Try another keyword.
              </p>
            </div>
          )}

          <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
            Showing {paginatedTable.length > 0 ? 1 : 0} to{" "}
            {paginatedTable.length} of {filteredTable.length} entries
          </div>
        </section>

        <footer className="mt-8 pb-4 text-xs text-gray-400">
          © 2026 MyPiHUB — Find Pharmacy
        </footer>
      </main>
    </DashboardLayout>
  );
};

export default FindPharmacy;

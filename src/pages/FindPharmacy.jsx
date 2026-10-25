
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

  // Search medicine cards
  const filteredCards = medicineCards.filter((item) =>
  [
    item.name,
    item.pharmacy,
    item.description,
    item.price,
  ].some((value) =>
    String(value ?? "")
      .toLowerCase()
      .includes(search)
  )
);

      
const filteredTable = useMemo(() => {
  const results = medicineTable.filter((item) => {
    const searchableValues = [
      item.name,
      item.serviceBy,
      item.category,
      item.code,
      item.price,
      item.discount,
    ];

    return searchableValues.some((value) =>
      normalize(value).includes(search)
    );
  });

  return results.sort((a, b) => {
    const result = String(a.name ?? "").localeCompare(
      String(b.name ?? ""),
      undefined,
      { sensitivity: "base" }
    );

    return sortOrder === "asc" ? result : -result;
  });
}, [search, sortOrder]);

  

  const paginatedTable = filteredTable.slice(0, entriesPerPage);

  return (
    <DashboardLayout title="Find Pharmacy">
      <div className="min-h-screen bg-gray-50/70 p-4 sm:p-6 lg:p-8">
        {/* Page heading */}
        <div className="mb-7">
          <div className="flex items-center gap-3 mb-2">
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
          </div>
        </div>

        {/* Search panel */}
        <section className="mb-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-800">
              Search Medicines
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Search by medicine name, pharmacy, category or ID.
            </p>
          </div>

          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Try Esomeprazole or Carry Medical..."
              aria-label="Search medicines and pharmacies"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-800 outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-purple-50 px-3 py-1.5 text-purple-700">
              {filteredCards.length} medicine cards
            </span>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-700">
              {filteredTable.length} table results
            </span>
          </div>
        </section>

        {/* Medicine cards */}
        <section className="mb-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Featured Medicines
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Available medicine listings
              </p>
            </div>
          </div>

          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCards.map((item, index) => (
                <MedicineCard
                  key={item.id ?? `${item.name}-${index}`}
                  data={item}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-10 text-center">
              <PackageSearch
                size={36}
                className="mx-auto mb-3 text-gray-300"
              />
              <h3 className="font-semibold text-gray-800">
                No medicines found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try another medicine or pharmacy name.
              </p>
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        {/* Medicine table */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Medicine Directory
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredTable.length} results
              {searchTerm ? ` for "${searchTerm}"` : " in total"}
            </p>
          </div>

          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-sm text-gray-600">
              Show
              <span className="relative">
                <select
                  value={entriesPerPage}
                  onChange={(e) =>
                    setEntriesPerPage(Number(e.target.value))
                  }
                  className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value={7}>7</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
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
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 sm:self-auto"
            >
              <ArrowUpDown size={16} />
              Sort by name: {sortOrder === "asc" ? "A–Z" : "Z–A"}
            </button>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Medicine</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Pharmacy</th>
                  <th className="px-5 py-4 font-semibold">Discount</th>
                  <th className="px-5 py-4 font-semibold">Price</th>
                  <th className="px-5 py-4 font-semibold">ID</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedTable.map((item, index) => (
                  <tr
                    key={item.id ?? `${item.code}-${index}`}
                    className="transition hover:bg-purple-50/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-9 w-9 object-contain"
                            />
                          ) : (
                            <Pill
                              size={21}
                              className="text-purple-600"
                            />
                          )}
                        </div>
                        <span className="font-semibold text-gray-800">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {item.category || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {item.serviceLogo && (
                          <img
                            src={item.serviceLogo}
                            alt=""
                            className="h-8 w-8 rounded-lg object-cover"
                          />
                        )}
                        <span className="font-medium text-gray-700">
                          {item.serviceBy || "—"}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {item.discount ?? "—"}
                    </td>

                    <td className="px-5 py-4 font-semibold text-gray-800">
                      {item.price != null
                        ? `${item.price} RM`
                        : "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-500">
                      {item.code || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile results */}
          <div className="space-y-3 p-4 md:hidden">
            {paginatedTable.map((item, index) => (
              <article
                key={item.id ?? `${item.code}-${index}`}
                className="rounded-xl border border-gray-100 p-4"
              >
                <div className="flex items-start gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-lg bg-gray-50 object-contain"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
                      <Pill className="text-purple-600" size={22} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="break-words font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.serviceBy || "Pharmacy not specified"}
                    </p>
                    <p className="mt-2 font-bold text-purple-700">
                      {item.price != null
                        ? `${item.price} RM`
                        : "Price unavailable"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Category</p>
                    <p className="mt-1 text-gray-700">
                      {item.category || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Discount</p>
                    <p className="mt-1 text-gray-700">
                      {item.discount ?? "—"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">Medicine ID</p>
                    <p className="mt-1 break-all text-gray-700">
                      {item.code || "—"}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {paginatedTable.length === 0 && (
            <div className="px-5 py-12 text-center">
              <PackageSearch
                size={36}
                className="mx-auto mb-3 text-gray-300"
              />
              <h3 className="font-semibold text-gray-800">
                No results found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Change your search keyword and try again.
              </p>
            </div>
          )}

          {/* Results count */}
          <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
            Showing{" "}
            {paginatedTable.length > 0 ? 1 : 0} to{" "}
            {paginatedTable.length} of {filteredTable.length} filtered
            entries
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 flex flex-col gap-3 pb-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026, made with ❤️ by{" "}
            <strong className="text-gray-700">MyPiHUB</strong>
            {" "}for a better web.
          </p>

          <div className="flex flex-wrap gap-5">
            <a
              href="#"
              className="transition hover:text-purple-600"
            >
              MyPatientHUB
            </a>
            <a
              href="#"
              className="transition hover:text-purple-600"
            >
              About Us
            </a>
            <a
              href="#"
              className="transition hover:text-purple-600"
            >
              Blog
            </a>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default FindPharmacy;
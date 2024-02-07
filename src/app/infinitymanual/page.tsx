"use client";

import { Fragment } from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getSuppliersInfinite, totalPagesSuppliers } from "@/hooks/useSupplier";

export default function InfinityManual() {
  let limit = 2;
  const { data: totalPages } = useQuery({
    queryKey: ["totalPages"],
    queryFn: async () => await totalPagesSuppliers(limit),
  });

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["suppliers"],
    queryFn: async ({ pageParam }) =>
      await getSuppliersInfinite(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < totalPages) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <center>
          <h1 className="mb-10">SUPPLIERS</h1>
        </center>

        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
        >
          {status === "pending" ? (
            <li>
              <center>
                <h2>Loading...</h2>
              </center>
            </li>
          ) : status === "error" ? (
            <li>
              <center>
                <h2>{error.message}</h2>
              </center>
            </li>
          ) : (
            data?.pages.map((group: any, i) => {
              return (
                <Fragment key={i}>
                  {group.data.map((item: any) => (
                    <li
                      key={item.id}
                      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                      <div className="flex flex-1 flex-col p-8">
                        <img
                          className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                          src="https://spa-company.com/wp-content/uploads/2020/03/dummy-logo-03-300x237.jpg"
                          alt=""
                        />
                        <h3 className="mt-6 text-sm font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between">
                          <dt className="sr-only">Phone</dt>
                          <dd className="text-sm text-gray-500">
                            {item.phone}
                          </dd>
                          <dt className="sr-only">Location</dt>
                          <dd className="mt-3">
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              {item.address}
                            </span>
                          </dd>
                        </dl>
                      </div>
                      <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                          <div className="flex w-0 flex-1">
                            <a
                              href={`mailto:test@email.com`}
                              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                            >
                              <EnvelopeIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              Email
                            </a>
                          </div>
                          <div className="-ml-px flex w-0 flex-1">
                            <a
                              href={`tel:0123456789`}
                              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                            >
                              <PhoneIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              Call
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </Fragment>
              );
            })
          )}
        </ul>

        {hasNextPage ? (
          <center>
            <button
              className="mt-5 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          </center>
        ) : null}
      </div>
    </div>
  );
}

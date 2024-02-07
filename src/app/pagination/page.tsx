"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { getSuppliersPaging, deleteSupplier } from "@/hooks/useSupplier";

export default function pagination() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const limit: number = 5;

  const { data, status, error, isFetching } = useQuery({
    queryKey: ["suppliers", { page, limit }],
    queryFn: async () => await getSuppliersPaging(page, limit),
    placeholderData: keepPreviousData,
  });

  const { mutate } = useMutation({
    mutationFn: async (id: any) => {
      await deleteSupplier(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Suppliers
              </h1>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link
                href={"/add"}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add supplier
              </Link>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          No
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Name
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Phone
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Address
                        </th>
                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {status === "pending" || isFetching ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                          >
                            <center>Loading ...</center>
                          </td>
                        </tr>
                      ) : status === "error" ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                          >
                            <center>{error.message}</center>
                          </td>
                        </tr>
                      ) : (
                        data?.data.map((item: any, index: number) => (
                          <tr key={item.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {(page - 1) * limit + 1 + index}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item.phone}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item.address}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <Link
                                href={`/edit/${item.id}`}
                                className="text-indigo-600 hover:text-indigo-900 m-1"
                              >
                                Edit
                                <span className="sr-only">, {item.id}</span>
                              </Link>
                              <button
                                onClick={() => mutate(item.id)}
                                className="text-red-600 hover:text-red-900 m-1"
                              >
                                Delete
                                <span className="sr-only">, {item.id}</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  <nav
                    className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                    aria-label="Pagination"
                  >
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-700">
                        Showing
                        <span className="font-medium"> {limit}</span> of{" "}
                        <span className="font-medium">{data?.total}</span>{" "}
                        results
                      </p>
                    </div>
                    <div className="flex flex-1 justify-between sm:justify-end">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === data?.last_page}
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                      >
                        Next
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

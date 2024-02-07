"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getSupplierById, updateSupplier } from "@/hooks/useSupplier";
import { useQuery } from "@tanstack/react-query";

export default function EditSupplier() {
  const { id } = useParams<any>();
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["supplier", id],
    queryFn: async () => await getSupplierById(id),
  });
  useEffect(() => {
    if (data) {
      setName(data.name);
      setPhone(data.phone);
      setAddress(data.address);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateSupplier(id, {
      name: name,
      phone: phone,
      address: address,
    });
    router.push("/");
  };
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Edit Supplier
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Supplier Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setName(e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Supplier Phone Number
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={phone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setPhone(e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Supplier Address
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={address}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setAddress(e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-start gap-x-6">
            <Link
              href={"/"}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

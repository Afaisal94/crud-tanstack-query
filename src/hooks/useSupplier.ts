import axios, { AxiosResponse } from "axios";

const BaseApiUrl: string = "https://pos-api.lazycoding.xyz/api";

type Supplier = {
  id?: number;
  name: string;
  phone: string;
  address: string;
};

const getSuppliers = async () => {
  const response: AxiosResponse<Supplier[]> = await axios.get<Supplier[]>(
    `${BaseApiUrl}/suppliers`
  );
  return response.data;
};

const getSuppliersPaging = async (page: number, limit: number) => {
  const response: AxiosResponse<any> = await axios.get<any>(
    `${BaseApiUrl}/suppliers?page=${page}&limit=${limit}`
  );
  return response.data;
};

const getSuppliersInfinite = async (pageParam = 1, limit: number) => {
  const response: AxiosResponse<any> = await axios.get<any>(
    `${BaseApiUrl}/suppliers?page=${pageParam}&limit=${limit}`
  );
  return response.data;
};

const getTotalSuppliers = async () => {
  const response: AxiosResponse<any> = await axios.get<any>(
    `${BaseApiUrl}/suppliers?page=1`
  );
  return response.data.total;
};

const totalPagesSuppliers = async (limit: number) => {
  const response: AxiosResponse<any> = await axios.get<any>(
    `${BaseApiUrl}/suppliers?page=1&limit=${limit}`
  );
  return response.data.last_page;
};

const getSupplierById = async (id: number) => {
  const response: AxiosResponse<Supplier> = await axios.get<Supplier>(
    `${BaseApiUrl}/suppliers/${id}`
  );
  return response.data;
};

const createSupplier = async (newItem: Supplier) => {
  const response: AxiosResponse<Supplier> = await axios.post<Supplier>(
    `${BaseApiUrl}/suppliers`,
    newItem
  );
  return response.data;
};

const updateSupplier = async (id: number, newItem: Supplier) => {
  await axios.put(`${BaseApiUrl}/suppliers/${id}`, newItem);
  return id;
};

const deleteSupplier = async (id: number) => {
  await axios.delete(`${BaseApiUrl}/suppliers/${id}`);
  return id;
};

export {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliersPaging,
  getTotalSuppliers,
  getSuppliersInfinite,
  totalPagesSuppliers
};

"use client";

import React, { FC, ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export interface IProvider {
  children: ReactNode;
}

export const Provider: FC<IProvider> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
  );
};

"use client";

import type { PropsWithChildren } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Menu />
      <div className="flex-1 flex flex-col">
        <Breadcrumb />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

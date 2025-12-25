"use client";

import { useBreadcrumb } from "@refinedev/core";
import Link from "next/link";

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={`breadcrumb-${breadcrumb.label}`} className="flex items-center gap-2">
              {index > 0 && (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {breadcrumb.href && !isLast ? (
                <Link
                  href={breadcrumb.href}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className={isLast ? "text-gray-900 font-medium" : "text-gray-500"}>
                  {breadcrumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

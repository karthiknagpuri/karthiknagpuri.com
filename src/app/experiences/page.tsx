"use client";

import { useList, useNavigation, useDelete } from "@refinedev/core";
import { Layout } from "@components/layout";

const CATEGORY_COLORS: Record<string, string> = {
  BUILDING: "bg-blue-100 text-blue-800",
  LEADING: "bg-purple-100 text-purple-800",
  ENABLING: "bg-green-100 text-green-800",
  "CO-FOUNDING": "bg-orange-100 text-orange-800",
};

export default function ExperiencesListPage() {
  const { data, isLoading } = useList({
    resource: "experiences",
    sorters: [{ field: "sort_order", order: "asc" }],
  });

  const { edit, create } = useNavigation();
  const { mutate: deleteExperience } = useDelete();

  const experiences = data?.data ?? [];

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Experiences</h1>
          <button
            onClick={() => create("experiences")}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            + Add Experience
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp: any) => (
              <div
                key={exp.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          CATEGORY_COLORS[exp.category] || CATEGORY_COLORS.BUILDING
                        }`}
                      >
                        {exp.category}
                      </span>
                      {exp.website_url && (
                        <a
                          href={exp.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Visit Website
                        </a>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {exp.organization_name}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {exp.role}
                      {exp.year_range && (
                        <span className="text-gray-400"> ({exp.year_range})</span>
                      )}
                    </p>
                    {exp.description && (
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => edit("experiences", exp.id)}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this experience?")) {
                          deleteExperience({
                            resource: "experiences",
                            id: exp.id,
                          });
                        }
                      }}
                      className="px-3 py-1.5 text-sm text-red-600 hover:text-red-800 border border-red-200 rounded-lg hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && experiences.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No experiences found. Add your first experience!
          </div>
        )}
      </div>
    </Layout>
  );
}

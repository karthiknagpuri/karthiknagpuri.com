"use client";

import { useList, useNavigation, useDelete } from "@refinedev/core";
import { Layout } from "@components/layout";

const BADGE_COLORS: Record<string, string> = {
  gray: "bg-gray-100 text-gray-800",
  red: "bg-red-100 text-red-800",
  orange: "bg-orange-100 text-orange-800",
  yellow: "bg-yellow-100 text-yellow-800",
  green: "bg-green-100 text-green-800",
  teal: "bg-teal-100 text-teal-800",
  blue: "bg-blue-100 text-blue-800",
  cyan: "bg-cyan-100 text-cyan-800",
  purple: "bg-purple-100 text-purple-800",
  pink: "bg-pink-100 text-pink-800",
};

export default function BadgesListPage() {
  const { data, isLoading } = useList({
    resource: "badges",
  });

  const { edit, create } = useNavigation();
  const { mutate: deleteBadge } = useDelete();

  const badges = data?.data ?? [];

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Badges</h1>
          <button
            onClick={() => create("badges")}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            + Add Badge
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge: any) => (
              <div
                key={badge.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        BADGE_COLORS[badge.color] || BADGE_COLORS.gray
                      }`}
                    >
                      {badge.name}
                    </span>
                    {badge.description && (
                      <p className="text-gray-600 text-sm mt-2">
                        {badge.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => edit("badges", badge.id)}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Delete this badge?")) {
                        deleteBadge({
                          resource: "badges",
                          id: badge.id,
                        });
                      }
                    }}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && badges.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No badges found. Create your first badge!
          </div>
        )}
      </div>
    </Layout>
  );
}

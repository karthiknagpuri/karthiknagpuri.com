"use client";

import { useList, useNavigation, useDelete } from "@refinedev/core";
import { Layout } from "@components/layout";

export default function ProfilesListPage() {
  const { data, isLoading } = useList({
    resource: "profiles",
  });

  const { show, edit, create } = useNavigation();
  const { mutate: deleteProfile } = useDelete();

  const profiles = data?.data ?? [];

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profiles</h1>
          <button
            onClick={() => create("profiles")}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            + Add Profile
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {profiles.map((profile: any) => (
                  <tr key={profile.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          {profile.name?.charAt(0) || "?"}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">
                            {profile.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {profile.title || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                      {new Date(profile.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => show("profiles", profile.id)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        View
                      </button>
                      <button
                        onClick={() => edit("profiles", profile.id)}
                        className="text-gray-600 hover:text-gray-800 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete this profile?")) {
                            deleteProfile({
                              resource: "profiles",
                              id: profile.id,
                            });
                          }
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {profiles.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No profiles found. Create your first profile!
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

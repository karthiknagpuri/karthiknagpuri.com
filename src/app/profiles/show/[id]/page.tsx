"use client";

import { useOne, useNavigation } from "@refinedev/core";
import { Layout } from "@components/layout";
import { useParams } from "next/navigation";

export default function ProfilesShowPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useOne({
    resource: "profiles",
    id,
  });

  const { list, edit } = useNavigation();

  if (isLoading) {
    return (
      <Layout>
        <div className="p-6">Loading...</div>
      </Layout>
    );
  }

  const profile = data?.data;

  return (
    <Layout>
      <div className="p-6 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile Details</h1>
          <div className="flex gap-3">
            <button
              onClick={() => edit("profiles", id)}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Edit
            </button>
            <button
              onClick={() => list("profiles")}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back to List
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <div className="flex items-center gap-4">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-medium text-gray-600">
                {profile?.name?.charAt(0) || "?"}
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{profile?.name}</h2>
              <p className="text-gray-600">{profile?.title || "No title"}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Bio</h3>
            <p className="text-gray-900">
              {profile?.bio || "No bio provided"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Created
              </h3>
              <p className="text-gray-900">
                {new Date(profile?.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Updated
              </h3>
              <p className="text-gray-900">
                {new Date(profile?.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

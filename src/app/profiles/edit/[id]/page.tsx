"use client";

import { useOne, useUpdate, useNavigation } from "@refinedev/core";
import { Layout } from "@components/layout";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ProfilesEditPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading: isFetching } = useOne({
    resource: "profiles",
    id,
  });

  const { mutate: updateProfile, isLoading: isUpdating } = useUpdate();
  const { list } = useNavigation();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name || "",
        title: data.data.title || "",
        bio: data.data.bio || "",
        avatar_url: data.data.avatar_url || "",
      });
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(
      {
        resource: "profiles",
        id,
        values: formData,
      },
      {
        onSuccess: () => {
          list("profiles");
        },
      }
    );
  };

  if (isFetching) {
    return (
      <Layout>
        <div className="p-6">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar URL
            </label>
            <input
              type="url"
              value={formData.avatar_url}
              onChange={(e) =>
                setFormData({ ...formData, avatar_url: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => list("profiles")}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

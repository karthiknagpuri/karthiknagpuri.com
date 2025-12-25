"use client";

import { useCreate, useNavigation, useList } from "@refinedev/core";
import { Layout } from "@components/layout";
import { useState } from "react";

const CATEGORIES = [
  { value: "BUILDING", label: "BUILDING", color: "bg-blue-100 text-blue-800" },
  { value: "LEADING", label: "LEADING", color: "bg-purple-100 text-purple-800" },
  { value: "ENABLING", label: "ENABLING", color: "bg-green-100 text-green-800" },
  { value: "CO-FOUNDING", label: "CO-FOUNDING", color: "bg-orange-100 text-orange-800" },
];

export default function ExperiencesCreatePage() {
  const { mutate: createExperience, isLoading } = useCreate();
  const { list } = useNavigation();

  // Get profiles for dropdown
  const { data: profilesData } = useList({
    resource: "profiles",
  });
  const profiles = profilesData?.data ?? [];

  const [formData, setFormData] = useState({
    profile_id: "",
    category: "BUILDING",
    organization_name: "",
    role: "",
    year_range: "",
    description: "",
    website_url: "",
    logo_url: "",
    sort_order: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createExperience(
      {
        resource: "experiences",
        values: {
          ...formData,
          website_url: formData.website_url || null,
          logo_url: formData.logo_url || null,
          year_range: formData.year_range || null,
        },
      },
      {
        onSuccess: () => {
          list("experiences");
        },
      }
    );
  };

  return (
    <Layout>
      <div className="p-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Experience</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile *
            </label>
            <select
              required
              value={formData.profile_id}
              onChange={(e) =>
                setFormData({ ...formData, profile_id: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Select a profile</option>
              {profiles.map((profile: any) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, category: cat.value })
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                    cat.color
                  } ${
                    formData.category === cat.value
                      ? "ring-2 ring-black ring-offset-2"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name *
            </label>
            <input
              type="text"
              required
              value={formData.organization_name}
              onChange={(e) =>
                setFormData({ ...formData, organization_name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="e.g., EvolveX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="e.g., Founder & CEO"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year Range
            </label>
            <input
              type="text"
              value={formData.year_range}
              onChange={(e) =>
                setFormData({ ...formData, year_range: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="e.g., 2019-Present"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Describe the role and achievements..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
              <span className="text-gray-400 font-normal ml-2">
                (clicking the card will open this link)
              </span>
            </label>
            <input
              type="url"
              value={formData.website_url}
              onChange={(e) =>
                setFormData({ ...formData, website_url: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) =>
                setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Experience"}
            </button>
            <button
              type="button"
              onClick={() => list("experiences")}
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

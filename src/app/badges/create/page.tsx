"use client";

import { useCreate, useNavigation } from "@refinedev/core";
import { Layout } from "@components/layout";
import { useState } from "react";

const BADGE_COLORS = [
  { value: "gray", label: "Gray", class: "bg-gray-100 text-gray-800" },
  { value: "red", label: "Red", class: "bg-red-100 text-red-800" },
  { value: "orange", label: "Orange", class: "bg-orange-100 text-orange-800" },
  { value: "yellow", label: "Yellow", class: "bg-yellow-100 text-yellow-800" },
  { value: "green", label: "Green", class: "bg-green-100 text-green-800" },
  { value: "teal", label: "Teal", class: "bg-teal-100 text-teal-800" },
  { value: "blue", label: "Blue", class: "bg-blue-100 text-blue-800" },
  { value: "cyan", label: "Cyan", class: "bg-cyan-100 text-cyan-800" },
  { value: "purple", label: "Purple", class: "bg-purple-100 text-purple-800" },
  { value: "pink", label: "Pink", class: "bg-pink-100 text-pink-800" },
];

export default function BadgesCreatePage() {
  const { mutate: createBadge, isLoading } = useCreate();
  const { list } = useNavigation();

  const [formData, setFormData] = useState({
    name: "",
    color: "blue",
    description: "",
    icon: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBadge(
      {
        resource: "badges",
        values: formData,
      },
      {
        onSuccess: () => {
          list("badges");
        },
      }
    );
  };

  const selectedColor = BADGE_COLORS.find((c) => c.value === formData.color);

  return (
    <Layout>
      <div className="p-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Badge</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="e.g., Ecosystem Builder"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {BADGE_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, color: color.value })
                  }
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    color.class
                  } ${
                    formData.color === color.value
                      ? "ring-2 ring-black ring-offset-2"
                      : ""
                  }`}
                >
                  {color.label}
                </button>
              ))}
            </div>
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
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="What does this badge represent?"
            />
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">Preview:</p>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                selectedColor?.class || "bg-blue-100 text-blue-800"
              }`}
            >
              {formData.name || "Badge Name"}
            </span>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Badge"}
            </button>
            <button
              type="button"
              onClick={() => list("badges")}
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

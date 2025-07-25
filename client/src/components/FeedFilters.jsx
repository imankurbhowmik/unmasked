import React from "react";

const FeedFilters = ({ selected, setSelected }) => {
  const filters = [
    { label: "All Posts", value: "all" },
    { label: "Anonymous", value: "anonymous" },
    { label: "Named", value: "named" },
  ];

  return (
    <div className="flex gap-3 mt-6 mb-4 items-center">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setSelected(filter.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selected === filter.value
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FeedFilters;

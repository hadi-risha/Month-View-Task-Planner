import React from 'react';

interface FilterPanelProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categoryFilters: string[];
  onCategoryChange: (categories: string[]) => void;
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
  onResetFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchTerm,
  onSearchChange,
  categoryFilters,
  onCategoryChange,
  timeFilter,
  onTimeFilterChange,
  onResetFilters
}) => {
  const categories = ['To Do', 'In Progress', 'Review', 'Completed'];
  const timeOptions = [
    { value: '1week', label: 'Tasks within 1 week' },
    { value: '2weeks', label: 'Tasks within 2 weeks' },
    { value: '3weeks', label: 'Tasks within 3 weeks' },
  ];

  const handleCategoryToggle = (category: string) => {
    const updated = categoryFilters.includes(category)
      ? categoryFilters.filter(c => c !== category)
      : [...categoryFilters, category];
    onCategoryChange(updated);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-5 mb-6">
      {/* search */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* category filters */}
      <div className="mb-7">
        <label className="block text-sm text-gray-200 font-semibold mb-2">
          Categories
        </label>
        <div className="space-y-2 text-gray-200">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={categoryFilters.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="mr-2"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* time filter */}
      <div>
        <label className="block text-sm text-gray-200 font-semibold mb-2">
          Time-based
        </label>
        <div className="space-y-2 text-gray-200">
          {timeOptions.map(option => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="timeFilter"
                value={option.value}
                checked={timeFilter === option.value}
                onChange={(e) => onTimeFilterChange(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className='mt-6'>
        <button
          onClick={onResetFilters} 
          className="text-sm px-2 py-1 text-gray-200 bg-gray-700 rounded"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
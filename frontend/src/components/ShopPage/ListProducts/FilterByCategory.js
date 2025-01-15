import React from 'react';
import './Filter.css';

const FilterByCategory = ({
  selectedCategoryId, // category_id được chọn
  onFilterChange, // Hàm thay đổi category_id
  selectedPriceRange,
  onPriceRangeChange
}) => {
  const categories = [
    { id: 1, name: 'Thời trang nữ' },
    { id: 2, name: 'Thời trang nam' },
    { id: 3, name: 'Giày dép' },
    { id: 4, name: 'Phụ kiện' }
  ];

  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: '0-1,000,000 VND', min: 0, max: 1000000 },
    { label: '1,000,000-2,000,000 VND', min: 1000000, max: 2000000 },
    { label: '2,000,000-3,000,000 VND', min: 2000000, max: 3000000 },
    { label: '3,000,000-4,000,000 VND', min: 3000000, max: 4000000 }
  ];

  return (
    <div className="filter_by_category">
      {/* Lọc theo danh mục */}
      <h3>Filter by Category</h3>
      <ul className="category_list">
        <li
          className={!selectedCategoryId ? 'active' : ''}
          onClick={() => onFilterChange(null)}
        >
          All
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            className={selectedCategoryId === category.id ? 'active' : ''}
            onClick={() => onFilterChange(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>

      {/* Lọc theo giá */}
      <h3>Filter by Price</h3>
      <ul className="price_list">
        {priceRanges.map((range) => (
          <li
            key={range.label}
            className={selectedPriceRange && selectedPriceRange.label === range.label ? 'active' : ''}
            onClick={() => onPriceRangeChange(range)}
          >
            {range.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterByCategory;

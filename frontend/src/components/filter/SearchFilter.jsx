import React from 'react';
import { Input, Slider, DatePicker, Select, Button } from 'antd';
import '../style/style.css';

const { RangePicker } = DatePicker;

const SearchFilter = ({
  searchText, setSearchText,
  bedroomRange, setBedroomRange,
  dateRange, setDateRange,
  priceRange, setPriceRange,
  sortOrder, setSortOrder,
  reviewRange, setReviewRange,
  onSearch
}) => {
  return (
    <div className='filter-container'>
      <Input className='fixedWidth'
        placeholder="Search by title or address"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />

      <div className="slider-container">
        <span className="slider-label">Number of bedrooms: </span>
        <Slider className='fixedWidth'
            range
            value={bedroomRange}
            onChange={setBedroomRange}
            min={1}
            max={5}
            marks={{ 1: '1', 5: '5+' }}
        />
      </div>

      <RangePicker
        value={dateRange}
        onChange={setDateRange}
      />
      <div className="slider-container">
      <span className="slider-label">Price range: </span>
        <Slider className='fixedWidth'
            range
            value={priceRange}
            onChange={setPriceRange}
            min={0}
            max={10000}
            marks={{ 0: '$0', 10000: '$10000+' }}
        />
      </div>

      <div className="slider-container">
        <span className="slider-label">Review Range: </span>
        <Slider className='fixedWidth'
            range
            value={reviewRange}
            onChange={setReviewRange}
            min={1}
            max={5}
            marks={{ 1: '1', 5: '5+' }}
        />
      </div>

      <Select
        value={sortOrder}
        onChange={setSortOrder}
        style={{ width: 120 }}
      >
      <Select.Option value="asc">Ascending</Select.Option>
      <Select.Option value="desc">Descending</Select.Option>
      </Select>
      <Button type='primary' onClick={onSearch}>Search</Button>
    </div>
  );
};

export default SearchFilter;

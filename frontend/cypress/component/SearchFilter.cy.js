/* eslint-disable no-undef */
import React from 'react';
import { mount } from '@cypress/react';
import SearchFilter from '../../src/components/filter/SearchFilter';

describe('SearchFilter Component Test', () => {
  it('should mount and contain search filter elements', () => {
    // Create a state and handler function for testing
    const searchText = '';
    const setSearchText = () => {};
    const bedroomRange = [1, 5];
    const setBedroomRange = () => {};
    const dateRange = [];
    const setDateRange = () => {};
    const priceRange = [0, 10000];
    const setPriceRange = () => {};
    const reviewRange = [1, 5];
    const setReviewRange = () => {};
    const sortOrder = 'asc';
    const setSortOrder = () => {};
    const onSearch = () => {};

    // Mount the SearchFilter component
    mount(
      <SearchFilter
        searchText={searchText}
        setSearchText={setSearchText}
        bedroomRange={bedroomRange}
        setBedroomRange={setBedroomRange}
        dateRange={dateRange}
        setDateRange={setDateRange}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        reviewRange={reviewRange}
        setReviewRange={setReviewRange}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onSearch={onSearch}
      />
    );

    // Check whether elements such as input boxes and sliders exist
    cy.get('input').should('exist');
    cy.get('.ant-slider').should('exist');
    cy.get('.ant-picker-range').should('exist');
    cy.get('.ant-select').should('exist');
    cy.get('button').contains('Search').should('exist');
  });
});

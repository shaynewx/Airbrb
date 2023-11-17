/* eslint-disable no-undef */
import React from 'react';
import SearchComp from '../../src/components/search-comp';

describe('Search Component Test', () => {
  it('should mount', () => {
    // 加载 SearchComp
    cy.mount(<SearchComp />);
    // 里面有一个 input，placeholder 是 "请输入筛选条件"
    cy.get('input#searchListing').should('have.attr', 'placeholder', '请输入筛选条件');
  });
});

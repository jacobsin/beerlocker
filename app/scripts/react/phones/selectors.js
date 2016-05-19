import { NAME } from './constants';

export const getItems = state => state[NAME].items;

export const getDetail = state => state[NAME].detail;

export const getMainImageUrl = state => state[NAME].mainImageUrl;

export const getSearchText = state => state[NAME].searchText;

export const getSortOrder = state => state[NAME].sortOrder;

export const filterByText = (items, text) => {
  return items.filter(phone => text.length == 0 || phone.name.toLowerCase().indexOf(text.toLowerCase()) >= 0 || phone.snippet.toLowerCase().indexOf(text.toLowerCase()) >= 0);
};

export const sortBy = (items, sortOrder) => {
  const prop = sortOrder.replace(/^-/, '');
  const direction = sortOrder.startsWith('-') ? -1 : 1;
  return items.sort((phone1, phone2) => (phone1[prop] < phone2[prop] ? -1 : 1) * direction);
};

export const getFilteredItems = (state) => {
  const {items, searchText, sortOrder} = state[NAME];
  return sortBy(filterByText(items, searchText), sortOrder);
};



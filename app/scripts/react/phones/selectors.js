import { NAME } from './constants';

export const getItems = state => state[NAME].items;

export const getDetail = state => state[NAME].detail;

export const getMainImageUrl = state => state[NAME].mainImageUrl;

export const getSearchText = state => state[NAME].searchText;

export const filterByText = (items, text) => {
  return items.filter(phone => text.length == 0 || phone.name.indexOf(text) >= 0 || phone.snippet.indexOf(text) >= 0);
};

export const getFilteredItems = (state) => {
  const {items, searchText} = state[NAME];
  return filterByText(items, searchText);
};



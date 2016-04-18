import { NAME } from './constants';

export const getAll = state => state[NAME];

export const getDetail = state => state[NAME].detail;

export const getMainImageUrl = state => state[NAME].mainImageUrl;

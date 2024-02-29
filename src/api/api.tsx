import md5 from 'md5';
import { ICard } from '../types/types';
import qs from 'qs';

const URL = import.meta.env.VITE_URL;
const method = { POST: 'POST' };
const productsLimit = 50;

const getTimestamp = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = now.getUTCDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

const setOptions = () => {
  const password = import.meta.env.VITE_PASSWORD_API;
  const timestamp = getTimestamp();
  const string = `${password}_${timestamp}`;
  return md5(string).toString();
};

const setHeaders = () => {
  const xAuth = setOptions();
  return { 'Content-Type': 'application/json', 'X-Auth': xAuth };
};

const requestToDB = async (
  action: string,
  params: string,
  setData?: (arg: ICard[]) => void
) => {
  try {
    const response = await fetch(URL, {
      method: method.POST,
      headers: setHeaders(),
      body: JSON.stringify({ action: action, params: params }),
    });
    const data = await response.json();
    if (setData) {
      const uniqueProductsArray: ICard[] = [];
      await data.result.forEach((product: ICard) => {
        if (!uniqueProductsArray.some((p) => p.id === product.id)) {
          uniqueProductsArray.push(product);
        }
      });
      return setData(uniqueProductsArray);
    } else {
      const uniqueProductsArray = [...new Set(data.result)];
      return uniqueProductsArray;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllBrands = async (setOptions) => {
  try {
    const response = await fetch(URL, {
      method: method.POST,
      headers: setHeaders(),
      body: JSON.stringify({
        action: 'get_fields',
        params: { field: 'brand' },
      }),
    });
    const data = await response.json();
    const newData = await data.result.filter((item: string) => item);
    const uniqueBrandsArray = [...new Set(newData)].sort();
    setOptions(uniqueBrandsArray);
    return uniqueBrandsArray;
  } catch (err) {
    console.log(err);
  }
};

const setParamsQuery = () => {};

export const getAllProducts = async (setProducts) => {
  const productsIds = await requestToDB('get_ids', {
    offset: 1,
    limit: productsLimit,
  });
  await requestToDB('get_items', { ids: productsIds }, setProducts);
  return;
};

export const setFilters = async (filters, setProducts) => {
  const params = qs.parse(location.search.substring(1));
  const ids = await requestToDB('filter', {
    brand: 'Piaget',
  });
  await requestToDB('get_items', { ids: ids }, setProducts);
  return;
};

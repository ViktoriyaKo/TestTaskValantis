import md5 from 'md5';
import { ICard, IParams } from '../types/types';
import qs, { type ParsedQs } from 'qs';
import { Dispatch, SetStateAction } from 'react';
import {
  MAX_RETRY_COUNT,
  URL_FETCH,
  RETRY_DELAY_MS,
  productsLimit,
} from '../config';

const method = { POST: 'POST' };

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
  params: IParams,
  setData?: Dispatch<SetStateAction<ICard[]>>
) => {
  let retryCount = 0;

  while (retryCount < MAX_RETRY_COUNT) {
    try {
      const response = await fetch(URL_FETCH, {
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
    } catch (error) {
      console.log('Error occurred during request:', error);
      retryCount++;
      if (retryCount === MAX_RETRY_COUNT) {
        console.log('Max retry count reached', error);
      }
      console.log(`Retrying... Attempt ${retryCount}`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
};

export const getAllBrands = async (
  setOptions: Dispatch<SetStateAction<string[]>>,
  setTotalProducts: Dispatch<SetStateAction<number>>
) => {
  try {
    const response = await fetch(URL_FETCH, {
      method: method.POST,
      headers: setHeaders(),
      body: JSON.stringify({
        action: 'get_fields',
        params: { field: 'brand' },
      }),
    });
    const data = await response.json();
    setTotalProducts(data.result.length);
    const newData: string[] = await data.result.filter((item: string) => item);
    const uniqueBrandsArray = [...new Set(newData)].sort();
    setOptions(uniqueBrandsArray);
    return uniqueBrandsArray;
  } catch (err) {
    console.log(err);
  }
};

export const getAllProducts = async (
  setProducts: Dispatch<SetStateAction<ICard[]>>,
  initialPage: number
) => {
  try {
    const productsIds = await requestToDB('get_ids', {
      offset: initialPage,
      limit: productsLimit,
    });
    await requestToDB('get_items', { ids: productsIds }, setProducts);
    return;
  } catch (err) {
    console.log(err);
  }
};

const getIdsByFilter = async (params: ParsedQs, key: string) => {
  let data;
  switch (key) {
    case 'brand':
      data = await requestToDB('filter', {
        brand: params[key] as string,
      });
      break;
    case 'search':
      data = await requestToDB('filter', {
        product: params[key] as string,
      });
      break;
    case 'price':
      data = await requestToDB('filter', {
        price: Number(params[key]),
      });
      break;
    case 'page':
      data = await requestToDB('get_ids', {
        offset: Number(params[key]),
        limit: productsLimit,
      });
      break;
    default:
      data = await requestToDB('get_ids', {
        offset: 1,
        limit: productsLimit,
      });
  }
  return data;
};

export const setFilters = async (
  filters: string,
  setProducts: Dispatch<SetStateAction<ICard[]>>
) => {
  const params = qs.parse(filters.substring(1));
  const key = Object.keys(params)[0];
  const ids = await getIdsByFilter(params, key);
  await requestToDB('get_items', { ids: ids }, setProducts);
  return;
};

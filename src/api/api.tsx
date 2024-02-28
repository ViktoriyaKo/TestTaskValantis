import md5 from 'md5';
import { ICard } from '../types/types';

const getTimestamp = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = now.getUTCDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

const setOptions = () => {
  // const password = process.env.REACT_APP_PASSWORD_API;
  const password = 'Valantis';
  const timestamp = getTimestamp();
  const string = `${password}_${timestamp}`;
  return md5(string).toString();
};

export const requestToDB = async (
  action: string,
  params: string,
  setData?: (arg: ICard[]) => void
) => {
  try {
    const xAuth = setOptions();
    const response = await fetch('http://api.valantis.store:40000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Auth': xAuth },
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

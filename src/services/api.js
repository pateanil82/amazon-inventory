import config from "../config";
import http from "../utils/http";
import { interpolate } from "../utils/string";

//  <<<<<<<<<<<<<< Authorization Header >>>>>>>>>>>>>>

// ================================= Products Page =================================

export const getProductsList = async (authToken) => {
  const headers = {
    "authorization ": JSON.parse(authToken),
  };
  const { data } = await http.get(config.apiEndPoint.products.getProducts, { headers });
  return data;
};

// ================================= Forecasting Page =================================

export const saveCalculatedForecastDays = async (body, authToken) => {
  const headers = {
    "authorization ": JSON.parse(authToken),
  };
  const { data } = await http.post(config.apiEndPoint.forecasting.postCalculatedDays, {
    body,
    headers,
  });
  return data;
};

// ================================= Accounts Page =================================

export const getMarketPlaces = async (authToken) => {
  const headers = {
    "authorization ": JSON.parse(authToken),
  };
  const { data } = await http.get(config.apiEndPoint.marketplaces.getMarketPlaces, { headers });
  return data;
};

export const getAmazonLogs = async (authToken) => {
  const headers = {
    "authorization ": JSON.parse(authToken),
  };
  const { data } = await http.get(config.apiEndPoint.activities.getActivities, { headers });
  return data;
};

export const saveActivities = async (body, authToken) => {
  const headers = {
    "authorization ": JSON.parse(authToken),
  };
  const { data } = await http.post(config.apiEndPoint.activities.saveActivity, {
    body,
    headers,
  });

  return data;
};

export const get = async (id) => {
  const url = interpolate(config.apiEndPoint.todo.get, { id: id });

  const { data } = await http.get(url);

  return data.data;
};

export const create = async (body) => {
  const { data } = await http.post(config.apiEndPoint.todo.create, {
    body,
  });

  return data;
};

export const remove = async (id) => {
  const url = interpolate(config.apiEndPoint.todo.delete, {
    id: id,
  });
  const { data } = await http.remove(url);
  return data;
};

export const edit = async (id, body) => {
  const url = interpolate(config.apiEndPoint.todo.edit, {
    id: id,
  });
  const { data } = await http.put(url, {
    body,
  });

  return data;
};

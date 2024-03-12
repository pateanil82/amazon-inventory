import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: config.baseURI,
  headers: {
    "Content-type": "application/json",
  },
});

function get(url, { params = {}, responseType = "json", headers = {} } = {}) {
  const authHeaders = {};

  return instance({
    url,
    params,
    responseType,
    method: "get",
    headers: { ...authHeaders, ...headers },
  }).then((response) => response)
  .catch((err)=> err);
}

function post(url, { params = {}, body = {}, headers = {} } = {}) {
  const authHeaders = {};

  return instance({
    url,
    params,
    data: body,
    method: "post",
    headers: { ...authHeaders, ...headers },
  })
    .then((response) => {
      // if (response.data.status === "success") {
      //   toast.success("Todo created successfully!!");
      // }
      return response;
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
    });
}

function put(url, { params = {}, body = {}, headers = {} } = {}) {
  const authHeaders = {};

  return instance({
    url,
    params,
    data: body,
    method: "put",
    headers: { ...authHeaders, ...headers },
  }).then((response) => {
    // if (response.data.status === "success") {
    //   toast.success("Todo updated successfully!!");
    // }
    return response;
  });
}

function remove(url, { params = {}, headers = {} } = {}) {
  const authHeaders = {};

  return instance({
    url,
    params,
    method: "delete",
    headers: { ...authHeaders, ...headers },
  }).then((response) => {
    // if (response.data.status === "success") {
    //   toast.success("Todo deleted successfully!!");
    // }
    return response;
  });
}

const http = {
  ...instance,
  get,
  post,
  put,
  remove,
};

export default http;

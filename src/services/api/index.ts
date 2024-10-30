import axios from "axios";
import axiosInstance from "../axios-config";
import { baseUrl } from "@/utils";

type Request = {
  url: string;
  body: any;
  auth: boolean;
};

type DEL_REQ = Omit<Request, "body" | "auth">;
type PATCH_REQ = Omit<Request, "auth">;
type GET_REQ = Partial<Omit<Request, "body">>;

const deleteRequest = async ({ url }: DEL_REQ) =>
  (await axiosInstance.delete(url)).data;

const deleteWithAuth = async ({ url, body, auth = true }: Request) => {
  return (
    await (auth ? axiosInstance.delete(url, body) : axios.delete(url, body))
  ).data;
};

const get = async ({ url = "", auth = true }: GET_REQ) => {
  return (await (auth ? axiosInstance.get(url) : axios.get(baseUrl + url)))
    .data;
};

const post = async ({ url, body, auth = true }: Request) => {
  return (
    await (auth
      ? axiosInstance.post(url, body)
      : axios.post(baseUrl + url, body))
  ).data;
};

const patch = async ({ url, body }: PATCH_REQ) =>
  (await axiosInstance.patch(url, body)).data;

const put = async ({ url, body }: PATCH_REQ) =>
  (await axiosInstance.put(url, body)).data;

export const apiClient = {
  delete: deleteRequest,
  get,
  patch,
  post,
  put,
  deleteWithAuth,
};

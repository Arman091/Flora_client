import axiosInstance from "./axios-base";

const commonHeaders = {
  "Content-Type": "application/json",
};

const request = async (method, url, { data, params, headers = {}, signal } = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      signal,
      headers: { ...commonHeaders, ...headers },
    });
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Request failed";

    return Promise.reject({
      status,
      message,
      data: error?.response?.data,
      originalError: error,
    });
  }
};

export const api = {
  get: (url, params = {}, headers = {}, signal) =>
    request("get", url, { params, headers, signal }),

  post: (url, data = {}, headers = {}, signal) =>
    request("post", url, { data, headers, signal }),

  patch: (url, data = {}, headers = {}, signal) =>
    request("patch", url, { data, headers, signal }),

  delete: (url, headers = {}, signal) =>
    request("delete", url, { headers, signal }),
};

// Backward-compatible helper for legacy callsites
export const postWithToken = (url, data = {}, otherHeaders = {}, signal) =>
  api.post(url, data, otherHeaders, signal);
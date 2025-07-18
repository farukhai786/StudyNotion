import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,   // e.g., "POST", "GET", etc.
    url: `${url}`,         // API endpoint
    data: bodyData ? bodyData : null,  // for POST, PUT, etc.
    headers: headers ? headers : null, // optional headers
    params: params ? params : null     // for query params (GET)
  });
}


import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

//INTERCEPTOR REQUEST
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//INTERCEPTOR RESPONSE
api.interceptors.response.use(
  function onFulfilled(response) {
    console.log("Response: ", response.status, response.config.url);
    return response;
  },
  function onRejected(error) {
    // Do something with response error
    if (error.response) {
      console.error("API error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;

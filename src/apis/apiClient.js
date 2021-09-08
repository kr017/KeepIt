import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://gkeepback.herokuapp.com/`, //`http://localhost:9000/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (request) {
    // Do something before request is sent
    let token = JSON.parse(localStorage.getItem("hint"));
    if (request.url.includes("api")) {
      request.headers.authorization = token.token;
    }

    return request;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;

    if (res.status === 401) {
      localStorage.clear();
      window.location.href = "http://localhost:3000/signin";

      // userDispatch({ type: "LOGOUT" });
    }

    console.error(`Looks like there was a problem. Status Code: ` + res.status);
    return Promise.reject(error);
  }
);

export { axiosClient };

// import { getJwtToken } from "@/services/secureStoreService";
import axios from "axios";
import { router } from "expo-router";

const baseUrl = "https://api.cherryapp.in";

const apiClient = axios.create({
  baseURL: baseUrl,
});

apiClient.interceptors.request.use(
  async (config) => {
    // const token = await getJwtToken();
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NzQ3OTkxMDkwIiwiaWF0IjoxNzQ1MjUwMTk3LCJleHAiOjE3NTMwMjYxOTd9.aOd0donwsUrFj3neLWzEdjIQ36fNDYY6n9GTzy1lXp0";
    // console.log("Getting this Token while sending an API request: ", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["X-App-Version"] = "2.0.6";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("401 error");
        router.replace("/onboarding/SignUpScreen");
      } else if (error.response.status === 403) {
        console.log("403 error");
        router.replace("/onboarding/EligibilityVerificationScreen");
      } else if (error.response.status === 404) {
        console.log("404 error");
        router.replace("/onboarding/SignUpScreen");
      }
    } else {
      router.push("/error");
      console.error("No response received:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

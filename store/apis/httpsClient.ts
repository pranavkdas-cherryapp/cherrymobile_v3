// import { getJwtToken } from "@/services/secureStoreService";
import axios from "axios";
import { router } from "expo-router";

const baseUrl = "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: baseUrl,
});

apiClient.interceptors.request.use(
  async (config) => {
    // const token = await getJwtToken();
    // console.log("Getting this Token while sending an API request: ", token);
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface Params {
  page: number;
  limit: number;
  status?: string;
  role?: string;
  filters?: string;
  otherfilters?: string[];
  created_at?: string;
  headers?: { access_token_complexes: string };
}
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
axios.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = "en";
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong",
    ),
);

export default axiosInstance;

export const baseUrl = process.env.NEXT_PUBLIC_HOST_API;

export const fetcher = async ({
  url,
  config,
}: {
  url: string;
  config?: AxiosRequestConfig;
}) => {
  // Use axiosInstance directly instead of creating a new instance
  const response = await axiosInstance.get(url, {
    ...config,
    headers: {
      "Accept-Language": "en",
    },
  });

  return response.data;
};
export const getErrorMessage = (error: unknown): string => {
  let message: string;
 if (error instanceof Error) {
    // eslint-disable-next-line prefer-destructuring
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    if(typeof error?.message  === "object" && error?.message && "message" in error?.message)
      message = String(error?.message?.message )
    else
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }
  return message;
};

export const endpoints = {
  users: {
    fetch: "/user",
    delete: "/user/delete",
    register:"/auth/register",
    register_school:"/auth/register-school",
    update:"/user/update-profile",
    cities:"/auth/cities",
  },
  watches:{
    fetch:"/watch/get-all-IMEI",
    fetchSingleWatch:"/watch/get-IMEI",
    create:"/watch/insert",
    edit:"/watch/edit",
    delete:"/watch/delete-IMEI",
    unlink:"/watch/delete-watch-user",
    history_request:"/watch/get-admin-requests",
    get_single:"/watch/get-users-requests",
    ImportFile:"/watch/import/IMEI",
  },
  admins: {
    fetch: "user",
    register:"/auth/register/admin"
    
  },
  suggestions: {
    fetch: "/suggestions-complaints",
    reply: "/send-messages",
  },
  addetionalInfo: {
    specializations: "/additional-info/specializations",
    profile: "/additional-info/profile",
    statictics: "/additional-info/statictics",
  },
  Cities: {
    fetch: "/auth/cities",
    create: "/auth/create/city",
    edit: "/auth/edit/city",
    delete: "/auth/delete/city",
  },
  notification: {
    send: "/notification/send-to-all",
    fetch: "/notification",
  },
  generalSettings: {
    root: "/static-page",
    termsConditions: "/static-page/TERMS_AND_CONDITIONS",
    aboutUs: "/static-page/ABOUT_US",
    ContactUs: "/Contact-us",
    Commission:"/settings?type=COMMISSION",
    PharmacyOrder:"/settings?type=PHARMACY_ORDER_NUMBER"
  },
  faq: {
    fetch: "/faq",
  },
  storage: {
    base_storage: "/storage",
  },
  reviews:"/reservation/reviews",
};

"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axiosInstance, {
  endpoints,
  getErrorMessage,
  Params,
} from "../../utils/axios-client";
import { ITEMS_PER_PAGE } from "../Global-variables";

export const fetchUsers = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  role,
  filters,
  otherfilters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance.get(endpoints.users.fetch, {
      params: {
        page,
        limit,
        filters:`roles=${role}`,
        sortBy: "created_at=desc",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res;
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const AddUser = async (formData: FormData,role:"parents" | "drivers" | "schools" |"security"|"admins"): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    try {
      const accessToken = cookies().get("access_token")?.value;
      await axiosInstance.post(endpoints.users.register, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
          "Content-Type": "multipart/form-data",
        },
      });
  
      revalidatePath(`/dashboard/${role}`);
    } catch (error) {
      return {
        error: getErrorMessage(error),
      };
    }
  };
  

export const UpdateUser = async (formData: FormData,role:"parents" | "drivers" | "schools" |"security"|"admins",id?:string): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    try {
      const accessToken = cookies().get("access_token")?.value;
      await axiosInstance.put(endpoints.users.update, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
          "Content-Type": "multipart/form-data",
        },
        params: {
          id
        }
      });
      if (role) {
        revalidatePath(`/dashboard/${role}`);
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
      };
    }
  };

export const UpdateAdminProfile = async (formData: FormData): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    try {
      const accessToken = cookies().get("access_token")?.value;
     const res = await axiosInstance.put(endpoints.users.update, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
          "Content-Type": "multipart/form-data",
        },
      });
        revalidatePath(`/dashboard/profile`);
        return res?.data?.data;
    } catch (error) {
      return {
        error: getErrorMessage(error),
      };
    }
  };

export const removeUser = async ({id,revalidateData}:{id:string,revalidateData?:string}): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    try {
      const accessToken = cookies().get("access_token")?.value;
      await axiosInstance.delete(endpoints.users.delete, {
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
          "Content-Type": "multipart/form-data",
        },
      });
  
      revalidatePath("/dashboard/admins");
      if (revalidateData) {
        revalidatePath(revalidateData);
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
      };
    }
  };

  export const fetchSingleUser = async (id: string): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    const accessToken = cookies().get("access_token")?.value;
    try {
      const res = await axiosInstance(`${endpoints.users.fetch}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  export const fetchCities = async (): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    const accessToken = cookies().get("access_token")?.value;
    try {
      const res = await axiosInstance.get(endpoints.users.cities, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      });
      return(res.data.data)
    } catch (error: any) {
      return {
        error: getErrorMessage(error),
      };
    }
  };


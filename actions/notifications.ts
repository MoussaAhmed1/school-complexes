"use server";

/* eslint-disable consistent-return */
import { cookies } from "next/headers";
import axiosInstance, {
  endpoints,
  getErrorMessage,
  Params,
} from "../utils/axios-client";
import { ITEMS_PER_PAGE } from "./Global-variables";


export const fetchNotifications = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token_complexes")?.value;
  try {
    const res = await axiosInstance(endpoints.notification.fetch, {
      params: {
        page,
        limit,
        // filters: filters ? [`${filters}`] : null,
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

export const fetchSingleNotification = async (id:string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token_complexes")?.value;
  try {
    const res = await axiosInstance(`${endpoints.notification.fetch}/${id}`, {
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


interface NotificationBody {
  message_ar: string
  message_en: string
  title_ar: string
  title_en: string
  role: string
  users_id?: string[] | null
}

export async function sendNotifications(reqBody: NotificationBody) {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get('access_token_complexes')?.value;

  try {
    const res = await axiosInstance.post(`${endpoints.notification.send}`, reqBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': lang,
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (err) {
    return {
      error: getErrorMessage(err),
    };
  }
}
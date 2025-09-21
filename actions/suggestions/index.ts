"use server";

/* eslint-disable consistent-return */
import { cookies } from "next/headers";

import axiosInstance, { endpoints, getErrorMessage, Params } from "@/utils/axios-client";
import { ITEMS_PER_PAGE } from "../Global-variables";
import { Reply } from "@/types/settings/suggestions-complaints";

export const fetchSuggestions = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token_complexes")?.value;
  try {
    const res = await axiosInstance(endpoints.suggestions.fetch, {
      params: {
        page,
        limit,
        filters: [
          `user.phone=${filters}`,
          `email=${filters}`,
          `user.name=${filters}`,
        ],
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

export const fetchSingleSuggestion = async (id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token_complexes")?.value;
  try {
    const res = await axiosInstance(`${endpoints.suggestions.fetch}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
      params:{
        isDeleted:true
      }
    });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const ReplyOnSuggestion = async (data:Reply): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token_complexes")?.value;
  try {
    await axiosInstance.post(`${endpoints.suggestions.reply}`,data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

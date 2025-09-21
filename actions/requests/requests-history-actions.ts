"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import axiosInstance, {
  endpoints,
  getErrorMessage,
  Params,
} from "../../utils/axios-client";
import { ITEMS_PER_PAGE } from "../Global-variables";

export const fetchRequests = async ({
  page = 1,
  status,
  filters,
  limit = ITEMS_PER_PAGE,

}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token_complexes")?.value;
  try {
    const res = await axiosInstance.get(endpoints.watches.history_request, {
      params: {
        page,
        limit,
        filters:filters?[`user.name=${filters},status=${status}`,`user.phone=${filters},status=${status}`,`user.email=${filters},status=${status}`,`number=${filters},status=${status}`]:`status=${status}`,
        sortBy: "created_at=desc",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    },);
    return res;
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};
export const fetchSingleRequest = async (id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token_complexes")?.value;
  try {
    const res = await axiosInstance(`${endpoints.watches.get_single}/${id}`, {
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
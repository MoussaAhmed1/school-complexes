"use server";

/* eslint-disable consistent-return */
import { cookies } from "next/headers";
import axiosInstance, { getErrorMessage } from "@/utils/axios-client";

export interface suggestionsBody {
  title: string;
  description: string;
  email: string;
}
export const AddSuggestions = async (data: suggestionsBody): Promise<any> => {
  const lang = cookies().get("Language")?.value;

  try {
    const accessToken = cookies().get("access_token_complexes")?.value;
    await axiosInstance.post("/suggestions-complaints", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

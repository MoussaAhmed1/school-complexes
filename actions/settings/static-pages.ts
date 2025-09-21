"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import axiosInstance, { endpoints, getErrorMessage } from "@/utils/axios-client";


export const fetchStaticPages = async (page:"PRIVACY_POLICY" | "TERMS_AND_CONDITIONS"|"ABOUT_US"): Promise<any> => {
  const accessToken = cookies().get("access_token_complexes")?.value;
  const lang = cookies().get("Language")?.value;

  try {
    const res = await axiosInstance(endpoints.generalSettings.root + "/" + page, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res.data.data;
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};



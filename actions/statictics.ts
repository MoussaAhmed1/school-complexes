"use server";

/* eslint-disable consistent-return */
import { cookies } from "next/headers";
import axiosInstance, { endpoints } from "../utils/axios-client";

export const fetchStatictics = async ({
  lang,
}: {
  lang: string;
}): Promise<any> => {
  const accessToken = cookies().get("access_token_complexes")?.value;

  try {
    const res = await axiosInstance.get(endpoints.addetionalInfo.statictics, {
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

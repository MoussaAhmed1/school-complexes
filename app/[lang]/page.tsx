import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/_options";
import LoginForm from "@/components/forms/auth/login";
import { cookies } from "next/headers";

export default async function Home({ params }: { params: { lang: "ar" | "en" } }) {
  const session = await getServerSession(authOptions);
  const apiToken = cookies()?.get("access_token_complexes")?.value;

  if (session && apiToken) {
    redirect("/dashboard");
  }
  return <LoginForm  lang={params.lang} />
}

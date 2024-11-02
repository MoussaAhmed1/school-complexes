import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { UserProfileForm } from "@/components/forms/users-forms/profileForm/ProfileForm";
import { IUser } from "@/types/users";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";
import { getDictionary } from "../../messages";

export default async function ProfilePage({params}:{params:{lang:"ar"|"en"}}) {
  const session: { user: IUser } | null = await getServerSession(authOptions) as any;
  const {pages} = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: pages.users.profile, link: "/dashboard/profile" }];
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={pages.users.profile}
      />
      <UserProfileForm
        id={""}
        initialData={session?.user ? {
          first_name: session?.user?.first_name,
          last_name: session?.user?.last_name,
          birth_date: session?.user?.birth_date,
          gender: session?.user?.gender as "male" | "female",
          phone: session?.user?.phone,
          avatarFile: session.user?.avatar,
          premessions: session.user?.premessions,
        } : undefined}
        revalidatequery="/dashboard/admins"
        isAllowToModifyPermissions={session?.user?.premessions?.includes("Admins")||false}
      />
    </div>
  );
}




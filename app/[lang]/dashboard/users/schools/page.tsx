import { fetchUsers } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/shared/table/Shared-table";
import { SchoolColumns } from "@/components/tables/users-tables/parents/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/users";
import { Plus } from "lucide-react";
import Link from "next/link";
type paramsProps = {
  params: { lang: "ar" | "en" };
};

export default async function page({ params }: paramsProps) {
  const res = await fetchUsers();
  let users: IUser[] = res?.data?.data || [];
  const { navigation, shared } = await getDictionary(params?.lang);
  users = users.map((user) => {
    if (user?.school) {
      return {
        ...user,
        school: {
          ...user?.school,
          academic_stage:
            navigation[user?.school?.academic_stage as keyof typeof navigation],
        },
      } as IUser;
    } else return user;
  });
  const breadcrumbItems = [
    { title: navigation["schools"], link: `/dashboard/users/schools` },
  ];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`${navigation["schools"]}`} />
        <Link
          href={`/${params?.lang}/dashboard/users/schools/create`}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Plus className="ltr:mx-1 rtl:ml-2 h-4 w-4" />
          {shared.add_new}
        </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey={"schools"}
          pageNo={0}
          columns={SchoolColumns}
          totalitems={0}
          data={users as unknown as IUser[]}
          pageCount={0}
          withPagination={false}
          withSearch={false}
        />
      </div>
    </>
  );
}

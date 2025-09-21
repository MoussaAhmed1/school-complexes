import { fetchUsers } from "@/actions/users/users-actions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import StaticSchoolStats from "@/components/static-school-stats";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { IUser } from "@/types/users";

type paramsProps = {
  params: { lang: "ar" | "en" };
};
export const revalidate = 0;
export const dynamic = "auto";
export default async function StudentAttendancePage({ params }: paramsProps) {
  const { navigation } = await getDictionary(params?.lang);

  const breadcrumbItems = [
    { title: navigation["studentAttendanceStats"], link: `/dashboard/student-attendance` },
  ];
  const res = await fetchUsers();
    let users: IUser[] = res?.data?.data || [];
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
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`${navigation["studentAttendanceStats"]}`} />
        </div>
        <Separator />

        <StaticSchoolStats SchoolData={users}/>
      </div>
    </>
  );
}

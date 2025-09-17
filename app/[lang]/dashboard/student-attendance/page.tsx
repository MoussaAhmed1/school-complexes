import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import StaticSchoolStats from "@/components/static-school-stats";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

type paramsProps = {
  params: { lang: "ar" | "en" };
};

export default async function StudentAttendancePage({ params }: paramsProps) {
  const { navigation } = await getDictionary(params?.lang);

  const breadcrumbItems = [
    { title: navigation["studentAttendanceStats"], link: `/dashboard/student-attendance` },
  ];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`${navigation["studentAttendanceStats"]}`} />
        </div>
        <Separator />

        <StaticSchoolStats />
      </div>
    </>
  );
}

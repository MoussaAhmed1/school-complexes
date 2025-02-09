import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { fetchStaticPages } from "@/actions/settings/static-pages";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us page",
};


export default async function page({params}:{params:{lang:"ar"|"en"}}) {
  const aboutUsData = await fetchStaticPages("ABOUT_US");
  const { pages } = await getDictionary(params?.lang)

  const breadcrumbItems = [
    { title: pages.general_settings.aboutUs, link: "/dashboard/settings/about-us" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={pages.general_settings.aboutUs}
      />
        <Separator />

      <div className="space-y-4">
        <p>{aboutUsData?.content}</p>
      </div>
    </div>
  );
}

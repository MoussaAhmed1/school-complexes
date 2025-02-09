import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { fetchStaticPages } from "@/actions/settings/static-pages";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Privacy policy page",
};

export default async function page({params}:{params:{lang:"ar"|"en"}}) {
  const privacyPolicyData = await fetchStaticPages("PRIVACY_POLICY");
  const { pages } = await getDictionary(params?.lang)

  const breadcrumbItems = [
    { title: pages.general_settings.privacyPolicy, link: "/dashboard/settings/privacy-policy" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={pages.general_settings.privacyPolicy}
      />
        <Separator />

      <div className="space-y-4">
        <p>{privacyPolicyData?.content}</p>
      </div>
    </div>
  );
}

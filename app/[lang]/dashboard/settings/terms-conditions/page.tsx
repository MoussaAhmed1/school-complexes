import { fetchStaticPages } from "@/actions/settings/static-pages";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions page",
};

export default async function page({ params }: { params: { lang: "ar" | "en" } }) {
  const TermsConditionsdata = await fetchStaticPages("TERMS_AND_CONDITIONS");
  const { pages } = await getDictionary(params?.lang);
  const breadcrumbItems = [
    {
      title: pages.general_settings.termsAndConditions,
      link: "/dashboard/settings/terms-conditions",
    },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={pages.general_settings.termsAndConditions}
        description={pages.general_settings.termsAndConditionsDescription}
      />
        <Separator />

      <div className="space-y-4">
        <p>{TermsConditionsdata?.content}</p>
      </div>
    </div>
  );
}

import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { MessageForm } from "@/components/forms/send-suggestions-complaints";
import { Heading } from "@/components/ui/heading";
import React from "react";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{lang:"ar"|"en"}
};

export default async function Page({ searchParams,params }: paramsProps) {
  const { pages } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.general_settings.suggestionsComplaintsTitle, link: "/dashboard/messages" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
            title={pages.general_settings.suggestionsComplaintsTitle}
            description={`(${pages.general_settings.suggestionsComplaintsDescription  })`}
          />
      <MessageForm />
    </div>
  );
}

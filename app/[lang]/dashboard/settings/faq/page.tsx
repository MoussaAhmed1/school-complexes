import { fetchFaqs } from "@/actions/settings/faq";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getDictionary } from "@/app/[lang]/messages";
import { IFaqs } from "@/types/settings/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";
import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params: { lang: "ar" | "en" }
};

export default async function page({ searchParams, params }: paramsProps) {
  const { pages } = await getDictionary(params.lang);
  const breadcrumbItems = [{ title: pages.general_settings.faqs, link: "/dashboard/faq" }];
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchFaqs({
    page,
    limit,
    filters: search,
  });
  const faqs: IFaqs[] = res?.data?.data || [];
  const totalFaqs = faqs?.length || 0; //1000
  const pageCount = 1;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${pages.general_settings.exploreCommonQuestions}`}
          />
        </div>
        <Separator />
        <Accordion type="single" collapsible className="w-full">
          {
            faqs.map((faq: IFaqs) => (
          <AccordionItem value={faq.id}  key={faq.id} className="group border-b border-gray-200">
            <AccordionTrigger id={faq.id} className="flex justify-between items-center text-lg font-semibold py-4 px-6 w-full text-left group-focus:outline-none">
              <h2>{faq.title}</h2>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-2 text-gray-600 text-base transition-all duration-200 ease-in-out">
              <p>{faq.descrption}</p>
            </AccordionContent>
          </AccordionItem>
              
            ))
          }

        </Accordion>
        <div className="flex justify-center items-center mt-4 w-full">
        <Link href="/dashboard/messages">{pages.general_settings.stillHaveQuestions}</Link>
        </div>
      </div>
    </>
  );
}

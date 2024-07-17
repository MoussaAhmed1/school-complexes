import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { CheckCircle, CircleSlash, FileAudio, FileText } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import {
  formatCreatedAtDateAsDateTime,
} from "@/utils/helperFunctions";
import { fetchSinglePharmacyOrder } from "@/actions/pharmacy-order";
import { PharmacyOrder } from "@/types/pharmacy-order";
import { Card } from "@/components/ui/card";
import DrugsCard from "@/components/details/pharmacy-order/DrugsCard";
import { fetchPharmacyCategories } from "@/actions/pharmacy-categories";
import UserInfoCard from "@/components/details/pharmacy-order/UserInfo";
import Noitems from "@/components/details/no-items/NoItems";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const page = async ({ params }: { params: { pharmacyOrderId: string } }) => {
  const res = await fetchSinglePharmacyOrder(params.pharmacyOrderId);
  const categoriesRes = await fetchPharmacyCategories({
    page: 1,
    limit: 10,

  });
  const pharmacyOrder: PharmacyOrder = res?.data?.data;
  const breadcrumbItems = [
    { title: "Pharmacy orders", link: "/dashboard/pharmacy-orders" },
    {
      title: `${pharmacyOrder?.number}`,
      link: `/dashboard/pharmacies/${pharmacyOrder?.id}`,
    },
  ];
  const render_data_items =
    [
      {
        data_key: "Categories",
        data_value: pharmacyOrder?.categories[0]?.name,
      },
      {
        data_key: "Has Replied",
        data_value: pharmacyOrder?.has_replied ? <CheckCircle stroke="#39a845" size={18} /> : <CircleSlash style={{ color: '#8C0101' }} size={18} />,
      },
      {
        data_key: "Notes",
        data_value: pharmacyOrder?.notes,
      },
    ]
  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="ml-4" />
        <div className="flex items-start justify-between">
          <div className="flex flex-col md:flex-row gap-1 items-start">
            <Heading
              title={`Pharmacy order #${pharmacyOrder?.number}`}
              description={formatCreatedAtDateAsDateTime(
                pharmacyOrder?.created_at,
              )}
              customStyle="ml-4"
            />
            <p
              className="mt-[5px] mx-4"
              style={{
                color:
                  pharmacyOrder?.status === "STARTED"
                    ? "#1976d2"
                    : pharmacyOrder?.status === "CANCELLED"
                      ? "#8C0101"
                      : pharmacyOrder?.status === "COMPLETED"
                        ? "#28a745"
                        : pharmacyOrder?.status === "PENDING"
                          ? "#FFA500"
                          : "unset",
                background:
                  pharmacyOrder?.status === "STARTED"
                    ? "#ffe6e6"
                    : pharmacyOrder?.status === "CANCELLED"
                      ? "#fff5e6"
                      : pharmacyOrder?.status === "COMPLETED"
                        ? "#ecf8ef"
                        : "unset",

                fontWeight: 400,
                borderRadius: "12px",
                padding: 2,
              }}
            >
              {pharmacyOrder?.status}
            </p>
          </div>
        </div>
        <div className="w-full mx-auto p-4">
          <div className="overflow-hidden min-h-[77dvh]">
            <div className="py-4 px-2 2xl:mx-auto">
              <div className="flex flex-col xl:flex-row jusitfy-center items-start w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">

                  <Card className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-4 xl:p-5 w-full ">
                    <h6 className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800 mb-5">pharmacyOrder Details</h6>
                    <div className="flex justify-center items-center w-full h-full space-y-4 flex-col pb-4">

                      {
                        render_data_items?.map(({ data_key, data_value }, index) => (
                          <div className="flex justify-between w-full pb-5" key={data_key} style={{ borderBottom: ((index < render_data_items?.length - 1)) ? "1px solid lightgray" : "unset" }} >
                            <p className="text-base dark:text-white leading-4 text-gray-800">{data_key}</p>
                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{data_value ?? "-"}</p>
                          </div>
                        ))
                      }
                    </div>
                  </Card>


                  <Card className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Attachments
                    </h3>
                    {pharmacyOrder?.attachments?.length > 0 ? (
                      <div className="flex justify-between flex-wrap items-start w-full py-3 mt-2">
                        <div className="flex justify-center items-center space-x-4">
                          <div className="flex flex-wrap justify-center items-center">
                            {pharmacyOrder?.attachments?.map(
                              (attachment, index) => (
                                <div
                                  className="flex justify-center items-center w-1/2 mb-8"
                                  key={attachment?.id}
                                >
                                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                    <Link
                                      href={attachment.file}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FileText />
                                    </Link>
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Noitems
                        title={`No items`}
                        icon={<CircleSlash style={{ color: "gray", fontSize: "4.2em" }}
                        />}
                        minHeight={50}
                      />
                    )
                    }
                  </Card>

                  <Card className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Voice Recordings
                    </h3>
                    {pharmacyOrder?.voice_recording?.length > 0 ? (
                      <div className="flex justify-between flex-wrap items-start w-full py-3 mt-2">
                        <div className="flex w-1/2 space-x-4">
                          <div className="flex flex-row flex-wrap w-full">
                            {pharmacyOrder?.voice_recording.map(
                              (voice, index) => (
                                <div
                                  className="flex flex-row w-full mb-8"
                                  key={voice?.id}
                                  >
                                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                    <Link
                                      href={voice.file}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FileAudio />
                                    </Link>
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>) : (
                      <Noitems
                        title={`No items`}
                        icon={<CircleSlash style={{ color: "gray", fontSize: "4.2em" }}
                        />}
                        minHeight={100}
                      />
                    )}
                  </Card>
                </div>
                {/* customerDoctorDetails  */}
                <div className="flex flex-col justify-start items-start xl:w-fit w-full space-y-4 md:space-y-6 xl:space-y-9">
                  <UserInfoCard user={pharmacyOrder?.user} />
                  <DrugsCard drugs={pharmacyOrder?.drugs} categories={categoriesRes?.data?.data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

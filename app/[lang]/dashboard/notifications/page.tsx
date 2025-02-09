import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { getDictionary } from "../../messages";
import { SharedTable } from "@/components/shared/table/Shared-table";
import { Notification } from "@/types/notifications";
import { fetchNotifications } from "@/actions/notifications";
import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { NotificationsColumns } from "@/components/tables/notifications-tables/columns";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{lang:"ar"|"en"}
};

export default async function page({ searchParams,params}: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchNotifications({
    page,
    limit,
    filters: search,
  });
  const totalNotifications = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalNotifications / limit);
  const notifications: Notification[] = res?.data?.data || [];
  const { pages } = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: pages.notification.notifications, link: "/dashboard/notifications" }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${pages.notification.notifications} (${totalNotifications})`}
          />
        </div>
        <Separator />

        <SharedTable
          searchKey="notifications"
          pageNo={page}
          columns={NotificationsColumns}
          totalitems={totalNotifications}
          data={notifications as unknown as Notification[]}
          pageCount={pageCount}
          withSearch={false}
        />
      </div>
    </>
  );
}

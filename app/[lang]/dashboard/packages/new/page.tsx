import BreadCrumb from "@/components/breadcrumb";
import { PackageForm } from "@/components/forms/package-form/add-edit-package";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Packages", link: "/dashboard/packages" },
    { title: "Create", link: "/dashboard/packages/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <PackageForm  />
    </div>
  );
}

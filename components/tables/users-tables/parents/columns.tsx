"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IUser } from "@/types/users";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header:"name",
    cell: ({ row }) => (<div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.avatar ?? ""}
          alt={row?.original?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.name}
      </p>
    </div>),
    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: "phone",
    cell: ({ row }) => row?.original?.phone ?
    <p className="rtl:text-right text-left" dir="ltr">{row?.original?.phone}</p>
:
    <p className="rtl:text-right text-left" dir="ltr">-</p>
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
export const SchoolColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header:"name",
    cell: ({ row }) => (<div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.avatar ?? ""}
          alt={row?.original?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.name}
      </p>
    </div>),
    enableHiding: false,
  },

  {
    accessorKey: "cityCode",
    header: "cityCode",
    cell: ({ row }) => <p className="rtl:text-right text-left" dir="ltr">{row?.original?.school?.city_code}</p>,
  },
  {
    accessorKey: "phone",
    header: "phone",
    cell: ({ row }) => row?.original?.phone ?
    <p className="rtl:text-right text-left" dir="ltr">{row?.original?.phone}</p>
:
    <p className="rtl:text-right text-left" dir="ltr">-</p>
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "academic_stage",
    header: "academic_stage",
    cell: ({ row }) => <p className="rtl:text-right text-left" dir="ltr">{row?.original?.school?.academic_stage}</p>,
  },
  {
    accessorKey: "pending_requests",
    header: "pending",
  },
  {
    accessorKey: "confirmed_requests",
    header: "confirmed",
  },
  {
    accessorKey: "completed_requests",
    header: "completed",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export const parentsColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header:"name",
    cell: ({ row }) => (<div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.avatar ?? ""}
          alt={row?.original?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.name}
      </p>
    </div>),
    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: "phone",
    cell: ({ row }) => row?.original?.phone ?
    <p className="rtl:text-right text-left" dir="ltr">{row?.original?.phone}</p>
:
    <p className="rtl:text-right text-left" dir="ltr">-</p>
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "familyMembersCount",
    header: "familyMembersCount",
  },
  {
    accessorKey: "watchUsersCount",
    header: "watchUsersCount",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
export const SchoolAdminsColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header:"name",
    cell: ({ row }) => (<div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.avatar ?? ""}
          alt={row?.original?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.name}
      </p>
    </div>),
    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: "phone",
    cell: ({ row }) => row?.original?.phone ?
    <p className="rtl:text-right text-left" dir="ltr">{row?.original?.phone}</p>
:
    <p className="rtl:text-right text-left" dir="ltr">-</p>
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];


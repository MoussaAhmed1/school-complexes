import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};



export const navItems: NavItem[] = [
  {
    title: "Schools",
    href: "/dashboard/users/schools",
    label: "schools",
    icon: "school",
    subItems: false,
  },
];

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
    title: "Watches",
    href: "/dashboard/watches",
    icon: "watches",
    label: "watches",
    subItems: false,
  },
  {
    title: "Admins",
    href: "/dashboard/users/admins",
    icon: "admin",
    label: "admins",
    subItems: false,
  },
  {
    title: "Schools",
    href: "/dashboard/users/schools",
    label: "schools",
    icon: "school",
    subItems: false,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: "notification",
    label: "notifications",
    subItems: false,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: "messages",
    label: "messages",
    subItems: false,
  },
  {
    title: "City",
    href: "/dashboard/cities",
    icon: "city",
    label: "cities",
    subItems: false,
  },
  {
    title: "General Settings",
    href: "/dashboard/settings",
    icon: "settings",
    label: "general_settings",
    subItems: true,
    children: [
      {
        title: "About Us",
        href: "/dashboard/settings/about-us",
        label:"about_us"
      },
      {
        title: "FAQ",
        href: "/dashboard/settings/faq",
        label:"faq"
      },
      {
        title: "Terms and Conditions",
        href: "/dashboard/settings/terms-conditions",
        label:"terms_and_conditions"
      },
      {
        title: "privacyPolicy",
        href: "/dashboard/settings/privacy-policy",
        label:"privacyPolicy"
      },
    ],
  },
];

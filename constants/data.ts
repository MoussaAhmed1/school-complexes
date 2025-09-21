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
  {
    title: "Student Attendance Statistics",
    href: "/dashboard/student-attendance",
    icon: "barChart",
    label: "studentAttendanceStats",
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
    label: "suggestionsComplaintsTitle",
    subItems: false,
  },
  {
    title: "General Settings",
    href: "/dashboard/settings",
    icon: "info",
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

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import Cookies from 'js-cookie';
import { useTranslations } from "next-intl";
interface DashboardNavProps {
  _items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ _items, setOpen }: DashboardNavProps) {
  const t = useTranslations("navigation");
  let path = usePathname();
  const searchParams = useSearchParams();
  const currentLang = Cookies.get("Language") ?? "en";
  const currentLable = searchParams?.get("currentLable") ?? undefined;
  const removeLanguageCode = useCallback(
    (url: string): string => {
      // Check if the url starts with /en or /ar
      if (url.startsWith('/en') || url.startsWith('/ar')) {
        return url.slice(3); // Remove '/en' which is 3 characters long
      }
      // Return the original string if it doesn't start with /en or /ar
      return url;
    },
    [],
  )
  path = removeLanguageCode(path);
  const [selectedLable, setselectedLable] = useState<string | undefined>(currentLable)
  const items = _items

  return (
    <nav className="grid items-start gap-2">      
      {items?.map((link, index) => {
        if (!link?.children) {
          const Icon = Icons[link.icon || "arrowRight"];
          return (
            link.href && (
              <Link
                key={index}
                href={link.disabled ? "/" : `/${currentLang}${link.href}?currentLable=undefined`}
                onClick={() => {
                  setselectedLable(undefined);
                  setOpen && setOpen(false);
                }}
              >
                <span
                  className={cn(
                    "hover:text-blue-700 hover:no-underline text-start items-center flex w-full h-12 px-1 mt-2  ",
                    path === link.href || (path?.includes(link.href) && link.href !== "/dashboard")
                      ? "items-center w-full h-12 px-1 mt-2 bg-blue-200  text-blue-700"
                      : " hover:bg-blue-200"
                  )}
                // style={{
                //   color:path === `/${currentLang}${link.href}` ?"blue":"unset",
                //   backgroundColor:path === `/${currentLang}${link.href}` ?"#DBEAFE":"unset",
                // }}
                >
                  <Icon className="mx-2 h-4 w-4" />
                  <span className="text-nowrap flex-grow text-sm font-semibold">{t(link.label)}</span>
                </span>
              </Link>
            )
          );
        } else {
          const Icon = Icons[link.icon || "arrowRight"];

          return (
            <Accordion
              type="single"
              collapsible
              key={link.label}
              className="w-full"
              defaultValue={selectedLable ?? undefined}
            >
              <AccordionItem
                value={link.label ?? ""}
                className="group text-sm font-semibold no-underline text-start w-full pe-2 border-b-0"
              >
                <AccordionTrigger>
                  <div
                    className={cn(
                      "hover:text-blue-700 gap-1 no-underline text-start w-full flex items-center "
                    )}
                  >
                    <Icon className="w-5 h-5 " />
                    <span className=" text-sm font-semibold no-underline ">
                      {t(link.label)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {link.children.map((child) => {
                    const isActive = !!(path?.includes(child.href));
                    return (
                      <Link
                        key={child.href}
                        href={`/${currentLang}${child.href}?currentLable=${link.label}`}
                        onClick={() => {
                          setselectedLable(link.label);
                          setOpen && setOpen(false);
                        }}
                        className={cn(
                          " flex gap-1 items-center",
                          isActive
                            ? "flex items-center w-full h-12 px-3 mt-2 bg-blue-200 rounded text-blue-700"
                            : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-200 text-gray-600 dark:text-blue-400"
                        )}
                      >
                        <Icon className="w-5 h-5 text-sm" />
                        <span className="ms-1 text-sm font-semibold">
                          {t(child.label)}
                        </span>
                      </Link>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        }
      })}
    </nav>
  );
}

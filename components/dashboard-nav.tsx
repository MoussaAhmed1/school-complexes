"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookie from 'js-cookie';
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();
  const currentLang = Cookie.get("Language");
  console.log(path)
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((link, index) => {
        if (!link?.children) {
          const Icon = Icons[link.icon || "arrowRight"];
          return (
            link.href && (
              <Link
                key={index}
                href={link.disabled ? "/" : link.href}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}

              >
                <span
                  className={cn(
                    "hover:text-blue-700 hover:no-underline text-start items-center flex w-full h-12 px-3 mt-2  ",
                    path === `/${currentLang}${link.href}`
                      ? "items-center w-full h-12 px-3 mt-2 bg-blue-100 rounded text-blue-700"
                      : "rounded hover:bg-blue-50 "
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span className="text-nowrap flex-grow text-xs font-semibold">{link.title}</span>
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
            >
              <AccordionItem
                value={link.label ?? ""}
                className="group text-xs font-semibold no-underline text-start w-full pe-2 border-b-0"
              >
                <AccordionTrigger>
                  <div
                    className={cn(
                      "hover:text-blue-700 gap-1 no-underline text-start w-full flex items-center "
                    )}
                  >
                    <Icon className="w-5 h-5 " />
                    <span className=" text-xs font-semibold no-underline ">
                      {link.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {link.children.map((child) => {
                    const isActive = `/${currentLang}${child.href}` === path;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          " flex gap-1 items-center",
                          isActive
                            ? "flex items-center w-full h-12 px-3 mt-2 bg-blue-100 rounded text-blue-700"
                            : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-50 text-gray-600"
                        )}
                      >
                        <Icon className="w-5 h-5 text-xs" />
                        <span className="ms-1 text-xs font-semibold  ">
                          {child.title}
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

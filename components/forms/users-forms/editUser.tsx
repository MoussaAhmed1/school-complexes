"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import { Eye, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { IUser } from "@/types/users";
import { UserForm } from "./create-users/add-edit-user";
import { useParams } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRef } from "react";
interface IProps {
  user?: IUser;
  id?: string;
  readOnly?: boolean
}


export default function UserFormAction({ user, id, readOnly = false }: IProps) {
  const t = useTranslations("pages.general_settings");
  const dialogTitle = !readOnly ? t("editUser") : t("viewUser");
  const { role } = useParams();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const closeDailog = () => {
    if (closeRef.current) {
      closeRef.current.click();
    }
  }
  return (
    <Dialog >
      <DialogTrigger value={"edit"} >
        {user && !readOnly ? <Button size="icon" >
          {<Pencil className="h-4 w-4" />}
        </Button>
          :
          <Button
            type="button"
            variant="outline"
            size="icon"
          >
            <Eye className="h-4 w-4" />
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:min-w-[60%]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <UserForm _role={role as any} initialData={{
          ...user,
          avatarFile: user?.avatar
        } as any} id={id} readOnly={readOnly} closeDailog={closeDailog} />
      <DialogClose asChild className="hidden" >
        <Button type="button" variant="secondary" ref={closeRef}>
          {t('close')}
        </Button>
      </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

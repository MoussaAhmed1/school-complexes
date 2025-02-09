"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { Card } from "@/components/ui/card";
import ProfileSchema from "./ProfileSchema";
// import { toFormData } from "axios";
import AvatarPreview from "@/components/shared/AvatarPreview";
import InputDate from "@/components/shared/timepicker/InputDate";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { reloadSession } from "@/lib/funcs";
import { useTranslations } from "next-intl";
import { toFormData } from "axios";
import { ILogedUser } from "@/types/users";
import { UpdateAdminProfile } from "@/actions/users/users-actions";
import CustomPhoneInput from "../../phone-input";

export type UserFormValues = z.infer<typeof ProfileSchema>;

interface UserFormProps {
  initialData?: UserFormValues;
  id: string;
  revalidatequery: string;
  isAllowToModifyPermissions?: boolean;
}

export const UserProfileForm: React.FC<UserFormProps> = ({ initialData }) => {
  // const { toast } = useToast();
  const t = useTranslations("pages.users");
  const tShared = useTranslations("shared");
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const [currentLang] = useState(pathname?.includes("/ar") ? "ar" : "en");
  const [loading, setLoading] = useState(false);
  const action = initialData ? tShared("saveChanges") : tShared("create");
  const { update, data: session } = useSession();
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(
    undefined,
  );
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedAvatar(URL?.createObjectURL(file));
    }
  };
  const defaultValues = {
    phone: initialData?.phone,
    email: initialData?.email,
    name: initialData?.name,
  };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues,
  });
  const {
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (typeof initialData?.avatarFile === "string") {
      setSelectedAvatar(initialData?.avatarFile);
    }
  }, [initialData]);

  const onSubmit = async (data: UserFormValues) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);
    const formData = new FormData();
    toFormData(data, formData);
    //phone changed
    const hasPhoneChanged = data.phone !== initialData?.phone;
    const hasMailChanged = data.email !== initialData?.email;
    if (!hasPhoneChanged) {
      formData.delete("phone");
    }
    if (!hasMailChanged) {
      formData.delete("email");
    }

    const newUser: { error: string } & ILogedUser =
      await UpdateAdminProfile(formData);

    if (newUser?.error) {
      toast({
        variant: "destructive",
        title: initialData ? tShared("updateFailed") : tShared("addFailed"),
        description: newUser?.error,
      });
    } else {
      toast({
        variant: "default",
        title: initialData
          ? tShared("updatedSuccessfully")
          : tShared("addedSuccessfully"),
        description: initialData
          ? t(`profileUpdatedSuccessfully`)
          : t(`profileAddedSuccessfully`),
      });
      await update({
        ...session,
        user: {
          ...newUser,
          name: newUser?.name,
          image: newUser?.avatar,
          avatar: newUser?.avatar,
          phone: newUser?.phone,
          email: newUser?.email,
        },
      });
      reloadSession();
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <>
      <Card
        className="p-10 mx-0 border-0 min-h-[63dvh]"
        style={{
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        }}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <AvatarPreview selectedAvatar={selectedAvatar} />
            <div className="md:grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("fullName")} <span className="text-red-800">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("fullName")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <label className="block mb-2 font-medium">{t("phone")}</label>

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <CustomPhoneInput
                      value={field.value}
                      onChange={(value) =>{ 
                        if (!value.startsWith("+")) {
                          value = `+${value}`;
                        }
                        field.onChange(value)}}
                      error={errors.phone?.message}
                    />
                  )}
                />
              </div>
              {/* Avatar */}
              <FormItem
                style={{
                  margin: "-2px 0",
                }}
              >
                <FormLabel className="max-w-30 mx-1">{t("avatar")}</FormLabel>
                <div>
                  <Controller
                    name="avatarFile"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={(e) => {
                          field.onChange(
                            e.target.files ? e.target.files[0] : null,
                          );
                          handleAvatarChange(e);
                        }}
                      />
                    )}
                  />
                </div>
                {errors?.avatarFile?.message && (
                  <FormMessage style={{ marginLeft: "5px" }}>
                    {errors?.avatarFile?.message as any}
                  </FormMessage>
                )}
              </FormItem>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("email")} <span className="text-red-800">*</span>
                    </FormLabel>
                    <FormControl>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={t("email")}
                          {...field}
                          type="email"
                          required={!initialData}
                          autoComplete="new-password"
                        />
                      </FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("password")} <span className="text-red-800">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("password")}
                        type="password"
                        {...field}
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

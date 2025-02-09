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
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"
import { AddSuggestions } from "@/actions/settings/suggestions";
import { useTranslations } from "next-intl";



const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Message title must be at least 3 characters" }).max(160, "must not be longer than 160 characters."),
  description: z.string().min(10, {
    message: "Message description must be at least 10 characters.",
  }).max(500, "must not be longer than 500 characters."),
  email: z.string().email({ message: "Enter a valid email address" })
}).required(
  {
    title: true,
    description: true,
    email: true
  }
);

export type MessageFormValues = z.infer<typeof formSchema>;

interface MessageFormProps {
}

export const MessageForm: React.FC<MessageFormProps> = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("pages.notification");
  const tShared = useTranslations("pages.notification");
  const action = tShared("send");

  const defaultValues = {
    title: "",
    description: "",
    email: "",
  };

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const {
    reset
  } = form;
  const onSubmit = async (data: MessageFormValues) => {
    // alert(JSON.stringify(data));
    setLoading(true);
    const res = await AddSuggestions(data);
    if (res?.error) {
      toast({
        variant: "destructive",
        title: t("somethingWentWrong"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: t("messageSent"),
      });
      reset();
    }
    setLoading(false);

  };

  return (
    <Card className="p-10 mx-0 border-0" style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("title")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("description")}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      {...field}
                      rows={6}
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
  );
};

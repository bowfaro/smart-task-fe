"use client";

import { useTransition } from "react";
import { loginAction } from "@/lib/actions/auth.action";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/login";
import { z } from "zod";
import { constants } from "@/lib/utils/constant";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PhoneField from "@/components/phone-filed";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      countryCode: constants.countryCodes[0] || "+84",
      phone: "",
      password: "",
    },
  });

  const t = useTranslations("login");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("countryCode", values.countryCode);
      formData.append("phone", values.phone);
      formData.append("password", values.password);

      try {
        const res = await loginAction(formData) as any;
        if (res && res.error) {
          toast.error(res.error.message || "Login failed, please check your credentials.");
        }
      } catch (err: any) {
        if (err?.message === "NEXT_REDIRECT" || err?.digest?.startsWith("NEXT_REDIRECT")) throw err;
        toast.error(err.message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-lg border border-border/50 bg-card/80 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:border-border/80">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("title") || "Welcome back"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("description") || "Login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <PhoneField control={form.control} />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-foreground/80">{t("password") || "Password"}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••"
                          {...field} 
                          className="transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full relative group overflow-hidden transition-all duration-300 active:scale-[0.98]" disabled={isPending}>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                {isPending ? (t("loggingIn") || "Logging in...") : (t("submit") || "Login")}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {t("noAccount") || "Don't have an account?"}{" "}
            <Link href="/register" className="text-primary font-medium hover:underline underline-offset-4 transition-colors">
              {t("register") || "Register"}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
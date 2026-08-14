"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/validations/register";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/lib/apis/auth.api";
import PhoneField from "@/components/phone-filed";
import { constants } from "@/lib/utils/constant";
import { Link, useRouter } from "@/i18n/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("register");
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: (res: any) => {
      toast.success(res?.message || "Registration successful!");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Registration failed.");
    }
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      countryCode: constants.countryCodes?.[0] || "+84",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    await mutateAsync({
      fullName: data.fullName,
      phone: `${data.countryCode}${data.phone}`,
      password: data.password,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-lg border border-border/50 bg-card/80 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:border-border/80">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("title") || "Create an account"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("description") || "Enter your details to sign up for Smart Task"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-foreground/80">{t("fullName") || "Full Name"}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className="transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              <Button 
                type="submit" 
                className="w-full relative group overflow-hidden transition-all duration-300 active:scale-[0.98]" 
                disabled={isPending}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                {isPending ? (t("submitting") || "Creating account...") : (t("submit") || "Create account")}
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm text-muted-foreground mt-6">
            {t("hasAccount") || "Already have an account?"}{" "}
            <Link 
              href="/login" 
              className="text-primary font-medium hover:underline underline-offset-4 transition-colors"
            >
              {t("login") || "Login"}
            </Link>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-xs text-muted-foreground/80 leading-relaxed">
        {t("terms") || "By clicking continue, you agree to our"}{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary transition-colors">Terms of Service</Link>{" "}
        {t("and") || "and"}{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary transition-colors">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}
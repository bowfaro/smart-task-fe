"use client";

import { useState } from "react";
import { loginAction } from "@/lib/actions/auth.action";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
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

const { countryCodes } = constants;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [countryCode, setCountryCode] = useState("+84");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const submitAction = async (formData: FormData) => {
    let fullPhone = countryCode + formData.get("phone");
    formData.set("phone", fullPhone);
    await loginAction(formData);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your phone number and password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={submitAction} className="space-y-4">
              <input type="hidden" name="countryCode" value={countryCode} />
              <div className="grid gap-4 sm:grid-cols-[75px_minmax(0,1fr)]">
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">Code</label>
                  <select
                    value={countryCode}
                    onChange={(event) => setCountryCode(event.target.value)}
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  >
                    {countryCodes.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account? <a href="/register">Register</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
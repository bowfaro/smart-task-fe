import { useTranslations } from "next-intl";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { constants } from "@/lib/utils/constant";
import { Input } from "./ui/input";

export default function PhoneField({control}:{control: any}) {
    const t = useTranslations("login");
    return(
        <div className="grid gap-4 sm:grid-cols-[80px_minmax(0,1fr)]">
      <FormField
        control={control}
        name="countryCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("countryCode")}</FormLabel>
            <FormControl>
              <select {...field} className="h-9 w-full rounded-md border">
                {constants.countryCodes.map((code) => (
                  <option key={code} value={code} className="rounded-md border">
                    {code}
                  </option>
                ))}
              </select>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone"
        
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder={t("phonePlaceholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    );
}
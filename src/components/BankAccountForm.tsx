import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";
import { formatBSB } from "@/utils/formatters";

interface BankAccountFormProps {
  control: Control<any>;
}

export function BankAccountForm({ control }: BankAccountFormProps) {
  return (
    <>
      <FormField
        control={control}
        name="accountName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="bsb"
        render={({ field }) => (
          <FormItem>
            <FormLabel>BSB</FormLabel>
            <FormControl>
              <Input 
                placeholder="123-456" 
                {...field}
                onChange={(e) => {
                  const formatted = formatBSB(e.target.value);
                  field.onChange(formatted);
                }}
                maxLength={7}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="accountNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Number</FormLabel>
            <FormControl>
              <Input placeholder="12345678" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
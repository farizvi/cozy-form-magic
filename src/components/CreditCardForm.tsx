import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";
import { formatCardNumber, formatExpiryDate } from "@/utils/formatters";

interface CreditCardFormProps {
  control: Control<any>;
}

export function CreditCardForm({ control }: CreditCardFormProps) {
  return (
    <>
      <FormField
        control={control}
        name="cardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Card Number</FormLabel>
            <FormControl>
              <Input 
                placeholder="1234 5678 9012 3456" 
                {...field}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  field.onChange(formatted);
                }}
                maxLength={19}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input 
                  placeholder="MM/YY" 
                  {...field}
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value);
                    field.onChange(formatted);
                  }}
                  maxLength={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="cvv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input placeholder="123" {...field} maxLength={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { CreditCardForm } from "./CreditCardForm";
import { BankAccountForm } from "./BankAccountForm";

const formSchema = z.object({
  paymentMethod: z.enum(["credit-card", "bank-account"]),
  cardNumber: z.string()
    .regex(/^(\d{4} ){3}\d{4}$/, "Card number must be in format 'XXXX XXXX XXXX XXXX'")
    .optional()
    .superRefine((val, ctx) => {
      if (ctx.parent.paymentMethod === "credit-card" && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card number is required for credit card payments",
        });
      }
    }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format")
    .optional()
    .superRefine((val, ctx) => {
      if (ctx.parent.paymentMethod === "credit-card" && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Expiry date is required for credit card payments",
        });
      }
    }),
  cvv: z.string()
    .regex(/^\d{3}$/, "CVV must be exactly 3 digits")
    .optional()
    .superRefine((val, ctx) => {
      if (ctx.parent.paymentMethod === "credit-card" && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CVV is required for credit card payments",
        });
      }
    }),
  accountName: z.string()
    .min(1, "Account name is required")
    .optional()
    .superRefine((val, ctx) => {
      if (ctx.parent.paymentMethod === "bank-account" && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Account name is required for bank account payments",
        });
      }
    }),
  bsb: z.string()
    .regex(/^\d{3}-\d{3}$/, "BSB must be in format 'XXX-XXX'")
    .optional()
    .superRefine((val, ctx) => {
      if (ctx.parent.paymentMethod === "bank-account" && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "BSB is required for bank account payments",
        });
      }
    }),
  accountNumber: z.string()
    .regex(/^\d{6,10}$/, "Account number must be between 6 and 10 digits")
    .optional()
    .superRefine((val, ctx) => {
      if (ctx.parent.paymentMethod === "bank-account" && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Account number is required for bank account payments",
        });
      }
    }),
});

export function PaymentForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "credit-card",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Payment details submitted",
      description: "Your payment details have been saved successfully.",
    });
  }

  const paymentMethod = form.watch("paymentMethod");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="bank-account">Bank Account</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {paymentMethod === "credit-card" && <CreditCardForm control={form.control} />}
        {paymentMethod === "bank-account" && <BankAccountForm control={form.control} />}

        <Button type="submit" className="w-full">Submit Payment Details</Button>
      </form>
    </Form>
  );
}
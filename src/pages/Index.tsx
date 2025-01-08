import { PaymentForm } from "@/components/PaymentForm";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
          <p className="text-gray-500 mt-2">Enter your payment information below</p>
        </div>
        <PaymentForm />
      </div>
    </div>
  );
};

export default Index;
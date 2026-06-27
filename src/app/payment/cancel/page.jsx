import Link from "next/link";
import { FiX } from "react-icons/fi";

const PaymentCancelPage = () => (
  <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
    <div className="max-w-md w-full border border-default-100 rounded-2xl p-8 flex flex-col items-center gap-5 text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <FiX size={28} className="text-red-500" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-foreground">Payment Cancelled</h1>
        <p className="text-sm text-foreground-500 mt-2">
          Your payment was cancelled. No charges were made.
        </p>
      </div>
      <Link
        href="/dashboard/founder"
        className="w-full text-center bg-violet-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-violet-700 transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  </div>
);

export default PaymentCancelPage;
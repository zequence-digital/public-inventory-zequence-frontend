import Link from "next/link";

const ResendCodeOrChangeAccount = () => {
  return (
    <div className="flex items-center gap-2 text-muted-400">
      <p className="text-xs">Didn&apos;t receive it?</p>
      <Link
        href="/auth/resend-otp"
        className="text-xs font-semibold border-b border-muted-400 hover:border-none transition duration-300"
      >
        Resend code
      </Link>
    </div>
  );
};

export default ResendCodeOrChangeAccount;

import Link from "next/link";
import SignUpForm from "@/components/common/form/sign-up.form";
import BrandLogo from "@/components/common/brand-logo";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#fffaf5] px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-2xl">
        <BrandLogo className="mb-8 justify-center" imageClassName="h-20 w-20" />
        <section className="rounded-3xl border border-[#f0e3df] bg-white p-6 shadow-[0_20px_70px_rgba(83,27,47,0.1)] sm:p-10">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b91c4a]">
              Become a member
            </p>
            <h1 className="text-3xl font-black tracking-tight text-[#251b2b]">
              Create your account
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756875]">
              Join Nepali Store and discover products made with care.
            </p>
          </div>
          <SignUpForm />
          <p className="mt-8 text-center text-sm text-[#756875]">
            Already have an account?
            <Link
              href="/login"
              className="ml-1 font-bold text-[#b91c4a] hover:text-[#8f153a]"
            >
              Sign in
            </Link>
          </p>
        </section>
        <p className="mt-5 text-center text-xs text-[#9a8e98]">
          By creating an account, you agree to shop responsibly with Nepali
          Store.
        </p>
      </div>
    </main>
  );
}

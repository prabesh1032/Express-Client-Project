import Link from "next/link";
import BrandLogo from "@/components/common/brand-logo";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[#f4e9ed] p-0 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-screen max-w-[1500px] overflow-hidden bg-white shadow-[0_24px_90px_rgba(83,27,47,0.18)] sm:min-h-[calc(100vh-2rem)] sm:rounded-[2rem] lg:min-h-[calc(100vh-3rem)] lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative hidden overflow-hidden bg-[#7f153d] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute -right-28 -top-36 h-[28rem] w-[28rem] rounded-full bg-[#d9a441]/25" />
          <div className="absolute -bottom-52 -left-32 h-[32rem] w-[32rem] rounded-full border-[38px] border-[#f5d58a]/10" />
          <div className="absolute bottom-12 right-12 h-28 w-28 rounded-full border border-[#f5d58a]/20" />
          <div className="relative">
            <BrandLogo
              className="mb-20"
              imageClassName="h-16 w-16"
              showName={false}
            />
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-[#f5d58a]">
              Made with home in mind
            </p>
            <h2 className="max-w-lg text-5xl font-black leading-[1.08] tracking-tight xl:text-6xl">
              Discover the best of Nepal, delivered to you.
            </h2>
            <p className="mt-7 max-w-md text-base leading-7 text-white/70">
              Support local makers, explore honest products, and bring a little
              Nepal home.
            </p>
          </div>
          <div className="relative flex items-center gap-3 text-sm font-semibold text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#f5d58a]" />
            Shop local. Live beautifully.
          </div>
        </aside>
        <section className="relative flex min-h-screen items-center bg-[#fffdfb] px-6 py-8 sm:px-12 lg:min-h-0 lg:px-12 lg:py-6 xl:px-20">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-9 lg:hidden">
              <BrandLogo imageClassName="h-14 w-14" />
            </div>
            <div className="mb-7 lg:mb-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#b91c4a]">
                {eyebrow}
              </p>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-[#251b2b] sm:text-5xl lg:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#756875]">
                {description}
              </p>
            </div>
            {children}
            {footer}
            <Link
              href="/"
              className="mt-7 block text-center text-xs font-semibold text-[#a799a0] transition hover:text-[#b91c4a] lg:mt-4"
            >
              ← Back to Nepali Store
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

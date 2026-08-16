import Link from "next/link";
import SignUpForm from "@/components/common/form/sign-up.form";
import AuthShell from "@/components/common/auth/auth-shell";

export default function SignUpPage() {
  return <AuthShell eyebrow="Become a member" title="Create your account" description="Join Nepali Store and discover products made with care." footer={<p className="mt-6 text-center text-sm text-[#756875] lg:mt-4">Already have an account?<Link href="/login" className="ml-1 font-bold text-[#b91c4a] hover:text-[#8f153a]">Sign in</Link></p>}><SignUpForm /></AuthShell>;
}

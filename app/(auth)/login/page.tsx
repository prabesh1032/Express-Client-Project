'use client'

import Link from 'next/link'
import LoginForm from '@/components/common/form/login.form'
import AuthShell from '@/components/common/auth/auth-shell'

export default function LoginPage() {
  return <AuthShell eyebrow="Welcome back" title="Sign in to Nepali Store" description="Your favourite local finds are only a step away." footer={<p className="mt-8 text-center text-sm text-[#756875]">New to Nepali Store?<Link href="/sign-up" className="ml-1 font-bold text-[#b91c4a] hover:text-[#8f153a]">Create an account</Link></p>}><LoginForm /></AuthShell>
}

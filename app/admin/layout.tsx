"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiBarChart2,
  FiBox,
  FiChevronDown,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiTag,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { admins, Role } from "@/types/enum.types";
import { AuthUser } from "@/types/auth.types";
import { useToast } from "@/components/common/toast/toast-provider";

const navigation = [
  { label: "Overview", href: "/admin", icon: FiGrid },
  { label: "Products", href: "/admin/products", icon: FiBox },
  { label: "Brands", href: "/admin/brands", icon: FiTag },
  { label: "Orders", href: "/admin/orders", icon: FiBarChart2 },
  { label: "Customers", href: "/admin/customers", icon: FiUsers },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = localStorage.getItem("nepali-store-user");
      try {
        const parsed = stored ? (JSON.parse(stored) as AuthUser) : null;
        if (!parsed || !admins.includes(parsed.role)) router.replace("/");
        else setUser(parsed);
      } catch {
        router.replace("/");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [router]);

  const logout = () => {
    localStorage.removeItem("nepali-store-user");
    toast("You have been signed out.", "success");
    router.replace("/login");
  };

  if (!user)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf7f2] text-sm text-[#756875]">
        Checking admin access...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fbf7f2] text-[#251b2b]">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#eadfe2] bg-white px-5 py-6 transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-10 flex items-center justify-between px-2">
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-[#7f153d]"
          >
            Nepali Store<span className="text-[#d9a441]">.</span>
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FiX size={21} />
          </button>
        </div>
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a799a0]">
          Workspace
        </p>
        <nav className="space-y-1">
          {navigation.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${pathname === href ? "bg-[#f7e8ed] text-[#b91c4a]" : "text-[#756875] hover:bg-[#fbf7f2] hover:text-[#b91c4a]"}`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-1">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#756875] hover:bg-[#fbf7f2]"
          >
            <FiSettings size={18} />
            Settings
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#756875] hover:bg-[#f7e8ed] hover:text-[#b91c4a]"
          >
            <FiLogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>
      {menuOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-[#251b2b]/30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#eadfe2] bg-[#fbf7f2]/90 px-5 backdrop-blur sm:px-8">
          <button
            className="rounded-lg p-2 hover:bg-white lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a799a0]">
              Admin console
            </p>
            <h1 className="text-lg font-black">
              {pathname === "/admin" ? "Overview" : "Manage your store"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">{user.full_name}</p>
              <p className="text-xs text-[#a799a0]">
                {user.role === Role.SUPER_ADMIN
                  ? "Super admin"
                  : "Administrator"}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7f153d] text-sm font-black text-white">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
            <FiChevronDown className="text-[#a799a0]" size={16} />
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

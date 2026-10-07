import type { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Anjali Equipments",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="text-center">
          <p className="text-2xl font-bold tracking-tight text-slate-900">
            ANJALI EQUIPMENTS
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#8b191c]">
            Admin Portal
          </p>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            Sign in with your authorised admin account to manage the website
            catalogue.
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </main>
  );
}

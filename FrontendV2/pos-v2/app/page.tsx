import Link from "next/link";
import { Store, Package2, ClipboardList, Users, Shield, TrendingUp, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Package2, title: "Product Management", description: "Manage your entire inventory with ease. Add, edit, and track products in real-time." },
  { icon: ClipboardList, title: "Order Processing", description: "Fast and reliable order processing system with support for cash and debt transactions." },
  { icon: Users, title: "Client Management", description: "Keep track of your clients, their orders, and payment history all in one place." },
  { icon: CreditCard, title: "Debt Tracking", description: "Monitor outstanding debts and manage payment collections efficiently." },
  { icon: TrendingUp, title: "Sales Analytics", description: "Comprehensive dashboard with real-time sales data, trends, and performance metrics." },
  { icon: Shield, title: "Role-Based Access", description: "Secure multi-user support with admin and staff roles for granular access control." },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
      <header className="w-full border-b bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="size-6 text-blue-600" />
            <span className="font-bold text-xl">My<span className="text-blue-600">Store</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Your Complete
              <span className="text-blue-600"> POS </span>
              Solution
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Streamline your business operations with a modern point-of-sale system.
              Manage products, process orders, track debts, and gain insights — all in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="text-base px-8">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" size="lg" className="text-base px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t bg-white/50 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white">
              Everything you need to run your store
            </h2>
            <p className="mt-4 text-center text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              From inventory management to sales analytics, MyStore provides all the tools to grow your business.
            </p>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-xl border bg-white dark:bg-zinc-900 p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
                >
                  <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                    <feature.icon className="size-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Store className="size-4 text-blue-600" />
            <span>MyStore</span>
          </div>
          <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

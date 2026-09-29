import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, LogOut, UserRound, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "../api/useProfile";

const navItems = [
  { href: "/dashboard/events", label: "Events" },
  { href: "/dashboard/profile", label: "Profile" },
];

export function DashboardHeader() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { data: profile } = useProfile();

  const displayName = profile?.organizationName?.trim() || profile?.email || "Account";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-30 overflow-hidden bg-primary text-primary-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/pattern2.png')] bg-center bg-cover bg-no-repeat opacity-20"
      />
      <div className="relative z-10 mx-auto flex min-h-[4.5rem] w-full max-w-7xl items-center justify-between gap-4 px-6 py-3 sm:px-8 lg:px-10">
        <div className="flex min-w-0 items-center gap-6 lg:gap-10">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo.png"
              alt="Hackerspace"
              width={140}
              height={45}
              priority
              className="h-auto w-32 sm:w-36"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium tracking-normal transition-colors",
                    isActive
                      ? "bg-primary-foreground/15 text-primary-foreground"
                      : "text-primary-foreground/75 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full p-1 pr-2 outline-none transition-colors hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-primary-foreground/40">
              <Avatar className="size-9">
                {profile?.logoUrl ? (
                  <AvatarImage src={profile.logoUrl} alt="" />
                ) : null}
                <AvatarFallback className="bg-primary-foreground/15 text-xs text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden max-w-36 truncate text-left text-sm font-medium lg:block">
                {displayName}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-2 min-w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="normal-case tracking-normal">
                  <p className="truncate text-sm font-medium text-foreground">
                    {displayName}
                  </p>
                  <p className="truncate text-xs font-normal text-muted-foreground">
                    {profile?.email}
                  </p>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="md:hidden">
                <Link href="/dashboard/events" className="flex w-full items-center">
                  <CalendarDays className="mr-2 size-4" />
                  My Events
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/profile" className="flex w-full items-center">
                  <UserRound className="mr-2 size-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden">
                <Link href="/events" className="flex w-full items-center">
                  <Globe className="mr-2 size-4" />
                  Browse events
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => logout()}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

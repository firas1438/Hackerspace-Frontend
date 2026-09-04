"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ArrowUpRight, TextAlignJustify } from "lucide-react";
import { useState } from "react";

const navigationData = [
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Services",
    href: "/#services",
  },
  {
    title: "Process",
    href: "/#process",
  },
  {
    title: "Events",
    href: "/#events",
  },
  {
    title: "FAQ",
    href: "/#faq",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
];

const CollaborateButton = ({ className }: { className?: string }) => (
  <Button
    className={cn(
      "relative rounded-full p-1 ps-5 pe-12 group w-fit overflow-hidden",
      className,
    )}
  >
    <span className="relative z-10 text-xs">Browse events</span>
    <div className="absolute inset-y-1 right-1.5 aspect-square rounded-full bg-background text-foreground flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
      <ArrowUpRight className="size-4" />
    </div>
  </Button>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto w-full max-w-7xl py-4 px-4 sm:px-6 md:px-4 lg:px-6">
        <nav className="flex w-full items-center justify-between gap-4 lg:gap-6">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={140}
              height={45}
              priority
              className="h-auto w-36 sm:w-42"
            />
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center lg:flex">
            <NavigationMenu className="max-w-full">
              <NavigationMenuList className="flex gap-0">
                {navigationData.map((navItem) => (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuLink
                      href={navItem.href}
                      className="rounded-full px-2 py-2 text-sm font-medium tracking-normal text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground focus:bg-transparent focus-visible:outline-primary-foreground/40 data-[active=true]:bg-transparent data-[active=true]:focus:bg-transparent lg:px-3"
                    >
                      {navItem.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <CollaborateButton className="hidden shrink-0 lg:flex" />

          <div className="flex shrink-0 lg:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className="flex size-10 items-center justify-center rounded-full p-2 text-primary-foreground outline-none transition-colors hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-primary-foreground/40">
                <TextAlignJustify className="size-5" />
                <span className="sr-only">Menu</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="mt-2">
                {navigationData.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <Link
                      href={item.href}
                      className="w-full cursor-pointer text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

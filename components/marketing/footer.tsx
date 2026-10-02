import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import Wrapper from "@/components/wrapper";

const footerLinks = [
  { title: "About", href: "/#about" },
  { title: "Services", href: "/#services" },
  { title: "Events", href: "/#events" },
  { title: "Process", href: "/#process" },
  { title: "FAQ", href: "/#faq" },
  { title: "Contact", href: "/#contact" },
];

const socialLinks = [
  { title: "Facebook", href: "https://www.facebook.com/hackerspacehub/" },
  { title: "Instagram", href: "https://www.instagram.com/hackerspacetn/" },
  { title: "LinkedIn", href: "https://www.linkedin.com/company/hackerspacetn/" },
];

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/pattern2.png')] bg-center bg-cover bg-no-repeat opacity-15"
      />
      <Wrapper className="relative z-10 pb-10 pt-14 lg:pb-10 lg:pt-14">
        <div className="flex flex-col gap-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
            <div className="max-w-sm">
              <Link href="/" className="transition-opacity hover:opacity-75">
                <Image
                  src="/logo.png"
                  alt="Hackerspace"
                  width={140}
                  height={45}
                  className="h-auto w-40"
                />
              </Link>
              <p className="mt-5 text-base leading-relaxed text-white/60">
                A place to discover events, meet builders, and turn bold ideas
                into something real.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white">
                Explore
              </p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                {footerLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-white/60 transition-colors hover:text-primary"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white">
                Connect
              </p>
              <p className="max-w-xs text-sm leading-relaxed text-white/60">
                Have an idea or project to share?
              </p>
              <a
                href="mailto:contact@hackerspace.tn"
                className="mt-4 inline-block text-sm font-medium text-white/60 transition-colors hover:text-primary"
              >
                contact@hackerspace.tn
              </a>
            </div>

            <nav aria-label="Social links">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white">
                Socials
              </p>
              <ul className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-white/60 transition-colors hover:text-primary"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex justify-center border-t border-white/5 pt-8 text-center text-sm text-white/60">
            <p>
              © {new Date().getFullYear()} Hackerspace. All rights reserved.
            </p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;

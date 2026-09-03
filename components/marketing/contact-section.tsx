import { Clock3, Mail, MapPin } from "lucide-react";

import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="w-full bg-white text-foreground">
      <Wrapper className="py-20 sm:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <h2 className="max-w-xl text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              Let&apos;s build something together.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Have a question, an event idea, or a project to share? Send us a
              note and we&apos;ll get back to you.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:mt-14 lg:grid-cols-1">
              <div className="flex items-start gap-5">
                <Mail
                  className="mt-1 h-5 w-6 shrink-0 text-primary"
                  strokeWidth={1.8}
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <a
                    href="mailto:contact.hackerspace@gmail.com"
                    className="mt-1 block text-base font-medium hover:text-primary"
                  >
                    contact.hackerspace@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <MapPin
                  className="mt-1 h-6 w-6 shrink-0 text-primary"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Location
                  </p>
                  <p className="mt-1 text-base font-medium">
                    Built for local tech communities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <Clock3
                  className="mt-1 h-5 w-6 shrink-0 text-primary"
                  strokeWidth={1.8}
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Response time
                  </p>
                  <p className="mt-1 text-base font-medium">
                    Usually within one business day
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -top-7 z-0 size-32 text-primary/70 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-size-[0.75rem_0.75rem] sm:-right-8 sm:-top-10 sm:size-40"
            />
            <form className="relative z-10 flex flex-col gap-5 rounded-xs border border-border bg-muted p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Name
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="h-12 rounded-md border border-border bg-background px-4 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Email
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 rounded-md border border-border bg-background px-4 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Subject
                <input
                  name="subject"
                  type="text"
                  placeholder="What can we help with?"
                  className="h-12 rounded-md border border-border bg-background px-4 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Message
                <textarea
                  name="message"
                  placeholder="Tell us a little more..."
                  rows={6}
                  className="resize-none rounded-md border border-border bg-background px-4 py-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <Button type="submit" className="mt-2 w-fit">
                Send message
              </Button>
            </form>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ContactSection;

import { Clock3, Mail, MapPin } from "lucide-react";

import Wrapper from "@/components/wrapper";
import { ContactForm } from "@/components/marketing/forms/ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="w-full bg-white text-foreground">
      <Wrapper className="pt-20 sm:pt-20 lg:pt-20">
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
                    href="mailto:contact@hackerspace.tn"
                    className="mt-1 block text-base font-medium hover:text-primary"
                  >
                    contact@hackerspace.tn
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
            <ContactForm />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ContactSection;

import React from "react";
import Image from "next/image";
import Navbar from "@/components/marketing/navbar";
import Footer from "@/components/marketing/footer";
import Wrapper from "@/components/wrapper";

export default function AuthLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
            <Navbar />
            <main className="grow relative flex items-center justify-center min-h-screen pt-28 lg:pt-32 pb-16">
                <div className="fixed inset-0 z-0 pointer-events-none select-none">
                    <div className="absolute inset-0 bg-black/40" />
                    <Image
                        src="/bgpattern.png"
                        alt="background"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                </div>

                <Wrapper className="relative z-10 w-full flex items-center justify-center py-6">
                    {children}
                </Wrapper>
            </main>
            <Footer />
        </div>
    );
}

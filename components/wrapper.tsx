import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Wrapper = ({ children, className, id }: WrapperProps) => {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-7xl py-10 lg:py-12 px-6 md:px-4 lg:px-6",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Wrapper;

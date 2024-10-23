import * as React from "react";
import { cn } from "@/lib/utils";

// Define TextareaProps interface extending standard textarea attributes
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Forward ref to the textarea component for integration with forms
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
          className
        )}
        ref={ref} // Forward ref to textarea
        {...props} // Spread the remaining props to the textarea element
      />
    );
  }
);

// Set display name for the component for better debugging
Textarea.displayName = "Textarea";

export { Textarea };

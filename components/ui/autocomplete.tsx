"use client";

import { cn } from "@/lib/utils";
import {
    Children,
    cloneElement,
    ComponentPropsWithRef,
    forwardRef,
    type ReactElement,
    RefObject,
    useEffect,
    useRef,
    useState
} from "react";

interface AutocompleteProps {
  children: ReactElement<ComponentPropsWithRef<"input">>;
  className?: string;
  // Weitere Props hier hinzufügen
}

const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(
  ({ className, children, ...props }, ref) => {
    // Ensuring the Autocomplete component has exactly one child input element
    if (!children) {
      throw new Error("Autocomplete requires a child element");
    }

    if (children.type !== "input") {
      throw new Error("Autocomplete requires an input element as a child");
    }

    if (!Children.only(children)) {
      throw new Error("Autocomplete requires a single child element");
    }

    const inputRef = useRef<HTMLInputElement>(null);
    const [show, setShow] = useState(false);

    const combineRefs = (element: HTMLInputElement) => {
      inputRef.current = element;

      const childRef = children.props.ref;

      // Prüfe, ob das Child eine eigene Ref hat und aktualisiere diese
      if (typeof childRef === "function") {
        childRef(element);
      } else if (childRef) {
        (childRef as RefObject<HTMLInputElement>).current = element;
      }
    };

    const clonedChild = cloneElement(Children.only(children), {
      ...children.props,
      ref: combineRefs,
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
        setShow(true);
        children.props.onFocus?.(e);
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        setTimeout(() => setShow(false), 200);
        children.props.onBlur?.(e);
      },
    });

    useEffect(() => {
      const handleFocus = () => setShow(true);
      const handleBlur = () => setShow(false);

      inputRef.current?.addEventListener("focus", handleFocus, true);
      inputRef.current?.addEventListener("blur", handleBlur, true);

      return () => {
        inputRef.current?.removeEventListener("focus", handleFocus, true);
        inputRef.current?.removeEventListener("blur", handleBlur, true);
      };
    }, [inputRef]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          inputRef.current?.blur();
          setShow(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [inputRef.current?.value]);

    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        {clonedChild}
        <div
          className={cn(
            "absolute inset-x-0 top-[calc(100%_+_1rem)] rounded-lg p-8 border shadow-lg bg-card",
            show ? "block" : "hidden"
          )}
        ></div>
      </div>
    );
  }
);

Autocomplete.displayName = "Autocomplete";

export { Autocomplete };

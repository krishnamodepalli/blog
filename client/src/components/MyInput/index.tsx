import React, { ReactNode, useRef } from "react";

interface types {
  className?: string;
  placeholder?: string;
  autofocus?: boolean;
  sendData?: (data: string) => void;
  onEnterKey?: () => void;
}

export default function Component({
  className,
  placeholder,
  autofocus,
  sendData,
  onEnterKey = () => {alert("Enter key is pressed")}
}: types): ReactNode {
  const palceholderRef = useRef<HTMLSpanElement | null>(null);

  return (
    <div className="my-4 k-input">
      <span
        ref={palceholderRef}
        className={`${className} border-none pointer-events-none absolute z-0 ml-[6px] text-dim`}
      >
        {placeholder || "Placeholder"}
      </span>
      <p
        contentEditable
        autoFocus={autofocus}
        className={`${className} mypara z-1 bg-backg text-tp outline-none`}
        onKeyDown={(e: React.KeyboardEvent<HTMLParagraphElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEnterKey();
            return;
          }
        }}
        onInput={(e) => {
          const ph = palceholderRef.current;
          if (ph) {
            const val = e.currentTarget.innerText.trim();
            if (val.length !== 0) ph.style.zIndex = "-1";
            else ph.style.zIndex = "1";
            sendData && sendData(val);
          }
        }}
      ></p>
    </div>
  );
}

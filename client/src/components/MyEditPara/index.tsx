import React, { ReactNode } from "react";

import { raleway } from "@/app/_fonts";

interface types {
  children?: ReactNode;
}

export default function MyPara({ children }: types) {
  return (
    <p
      contentEditable
      className={`${raleway.className} mypara border-l-2 border-ts text-xl pl-8 leading-8 tracking-wide text-tp outline-none selection:bg-ts selection:text-backg`}
      onInput={(e) => {
        if (e.currentTarget.innerText.trim().length !== 0)
          e.currentTarget.style.borderColor = "transparent";
        else
          e.currentTarget.style.borderColor = "var(--secondary-text)";
      }}
    >
      {children}
    </p>
  );
}

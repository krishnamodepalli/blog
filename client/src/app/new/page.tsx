"use client";

import React, { useCallback, useRef } from "react";

import { montserrat, raleway } from "../_fonts";

export default function Page({}: {}) {
  const titlePHRef = useRef<HTMLSpanElement | null>(null);
  const paraRefs = useRef<[HTMLParagraphElement | null]>([null]);

  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  const handleEnterKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      insertNewPara();
      return;
    }
  }, []);

  const insertNewPara = () => {
    const contentContainer = contentContainerRef.current;
    if (contentContainer) {
      const newPara = document.createElement("p");
      newPara.className = `${raleway.className} text-ts outline-none mb-8 text-lg tracking-wider`;
      newPara.addEventListener("keydown", handleEnterKeyPress);
      newPara.contentEditable = "true";
      const pararefs = paraRefs.current;
      if (pararefs) {
        pararefs.push(newPara);
      }
      contentContainer.appendChild(newPara);
      newPara.focus();
    }
  };

  return (
    <div className="ml-16 mt-20">
      <div className="relative">
        <div id="title" className="mb-8">
          <div className="relative border-l-2 border-ts p-2 pl-4 text-6xl font-bold">
            <span
              ref={titlePHRef}
              className={`${raleway.className} pointer-events-none absolute z-[-1] text-dim`}
            >
              Title
            </span>
            <p
              contentEditable
              className="z-1 outline-none"
              onKeyDown={(e: React.KeyboardEvent<HTMLParagraphElement>) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  insertNewPara();
                  return;
                }
              }}
              onInput={(e) => {
                const titlePH = titlePHRef.current;
                if (titlePH) {
                  if (e.currentTarget.innerText.trim().length !== 0)
                    titlePH.style.opacity = "0";
                  else titlePH.style.opacity = "1";
                }
              }}
            ></p>
          </div>
        </div>
        <div ref={contentContainerRef} className="text-ts"></div>
      </div>
    </div>
  );
}

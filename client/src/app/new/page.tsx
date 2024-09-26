"use client";

import React, { useCallback, useRef } from "react";

import { montserrat, raleway } from "../_fonts";
import styles from "./styles.module.css";

export default function Page({}: {}) {
  const titlePHRef = useRef<HTMLSpanElement | null>(null);
  const paraRefs = useRef<Array<HTMLParagraphElement>>([]);

  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  const handleEnterKeyPress = useCallback((ref: HTMLParagraphElement) => {
    insertNewPara(ref);
    return;
  }, []);

  const insertNewPara = (ref?: HTMLParagraphElement) => {
    console.log(paraRefs.current);
    const contentContainer = contentContainerRef.current;
    if (contentContainer) {
      const newPara = document.createElement("p");
      newPara.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleEnterKeyPress(newPara);
        }
      });
      const paras = paraRefs.current;
      if (paras.length === 0) {
        contentContainer.appendChild(newPara);
        paras.push(newPara);
      } else if (ref) {
        contentContainer.insertBefore(newPara, ref.nextSibling);
        paras.splice(paras.indexOf(ref), 0, newPara);
      }
      newPara.focus();
    }
  };

  return (
    <div className="ml-16 mt-20">
      <div className={`relative ${styles.blog}`}>
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
        <div
          ref={contentContainerRef}
          className={`text-ts ${styles.content} ${raleway.className} md:text-lg lg:text-2xl`}
        ></div>
      </div>
    </div>
  );
}

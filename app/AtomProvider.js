"use client";
import { Provider } from "jotai";

export default function AtomProvider({ children }) {
  return <Provider>{children}</Provider>;
}

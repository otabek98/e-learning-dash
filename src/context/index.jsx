import React from "react";
import { AuthProvider } from "./Auth";

export default function MainProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

import React from "react";
import { Wrap } from "./style";

export default function Card({ children, flex, height }) {
  return (
    <Wrap flex={flex} height={height}>
      {children}
    </Wrap>
  );
}

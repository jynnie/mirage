import React from "react";
import { Box, Flex, Button } from "juniper";

export default function Playground() {
  return (
    <div>
      <Button
        onClick={() => new Promise((resolve) => setTimeout(resolve, 2400))}
      >
        Click Me
      </Button>
    </div>
  );
}

// 1. Import the utilities
import { extendTheme } from "@chakra-ui/react";

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  "xxs": "0px",
  "xs": "384px",
  sm: "576px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}

// 3. Extend the theme
const customTheme = extendTheme({ breakpoints })

export default customTheme

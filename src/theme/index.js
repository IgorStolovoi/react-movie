import { grey } from "@mui/material/colors";
export const light = {
  palette: {
    mode: "light",
    background: {
      default: "#а0а0а0",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#aab6fe",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        textInfo: {
          color: "#000",
          fontWeight: "500",
          "&:hover": {},
        },
      },
    },
  },
};
export const dark = {
  palette: {
    mode: "dark",
    background: {
      default: grey[900],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#26418f",
        },
      },
    },
  },
};
// MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root css-2bgrrw-MuiButtonBase-root-MuiButton-root
// MuiButton-root MuiButton-text MuiButton-textInfo MuiButton-sizeSmall MuiButton-textSizeSmall MuiButtonBase-root css-rs1khk-MuiButtonBase-root-MuiButton-root

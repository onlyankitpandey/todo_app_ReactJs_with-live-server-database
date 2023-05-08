import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#0F212E"
      }
    },
    MuiTableCell: {
      body: {
        color: "#FFFFFF"
      },
      head: {
        color: "#FFFFFF"
      }
    },
    MuiAppBar: {
      colorPrimary: {
        color: "#ffffff",
        backgroundColor: "#0F212E"
      },
      colorDefault: {
        color: "#ffffff",
        backgroundColor: "#0F212E"
      }
    },
    MuiIconButton: {
      colorPrimary: {
        color: "#e59446"
      }
    },
    MuiInputBase: {
      fullWidth: {
        backgroundColor: "#171425",
        color: "#E59446"
      },
    },
    MuiDialog: {
      paper: {
        backgroundColor: "#171425"
      }
    },

    MuiButton: {
      label: {
        color: "#FFFFFF"
      },
      root: {
        "&:hover": {
          backgroundColor: "none",
        },
      },
      containedPrimary: {
        color: "#ffff",
        height: "43px",
        padding: "10px 39px !important",
        fontSize: "14px !important",
        lineHeight: "21px",
        borderRadius: "5px",
        background: "#E59446 !important",
        border: "2px solid #E59446",
        fontWeight: "400",
        "&:hover": {
          border: "2px solid #E59446",
          background: "transparent !important",
          color: "#FFFFFF",
        },
      },
    },

  },
};

const themesOptions = {
  typography: {
    fontWeight: 400,
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    type: "light",
    action: {
      primary: "#20509e",
    },
    background: {
      default: "#171425",
      dark: "#f3f7f9",
      paper: "#0F212E",
    },
    primary: {
      main: "#898989",
      dark: "#de0d0d",
      light: "#de0d0d",
    },
    secondary: {
      main: "#fff",
    },
    warning: {
      main: "#ffae33",
      dark: "#ffae33",
      light: "#fff1dc",
    },
    success: {
      main: "#54e18c",
      dark: "#54e18c",
      light: "#e2faec",
    },
    error: {
      main: "#ff7d68",
      dark: "#ff7d68",
      light: "#ffe9e6",
    },
    text: {
      primary: "#52565c",
      secondary: "#999999",
    },
    common: {
      black: "#222222",
    },
  },
};

export const createTheme = (config = {}) => {
  let theme = createMuiTheme(_.merge({}, baseOptions, themesOptions));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};

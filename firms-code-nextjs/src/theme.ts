'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light' as const,
    primary: {
      main: '#AC162C', // Linstol red color
    },
    secondary: {
      main: '#1976d2',
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc', // Light gray background for cards
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#AC162C',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#f8fafc',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          borderRadius: '0.375rem',
        },
        contained: {
          '&:hover': {
            backgroundColor: '#8a1123', // Darker red for hover
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

export const theme = createTheme(themeOptions); 
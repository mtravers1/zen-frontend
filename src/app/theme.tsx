"use client";
import { ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';

const themeObj = createTheme({
  palette: {
    primary: {
      main: '#006747',
    },
    secondary: {
      main: '#E0E721',
    },
  },
  components: {
    MuiChip: {
      variants: [
        {
          props: { size: 'xsmall' },
          style: {
            height: 14,
            fontSize: '0.65rem',
            borderRadius: 8,
            '& .MuiChip-label': {
              padding: '0 3px',
            },
          },
        },
      ],
    },
  },
});

export default function Theme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={themeObj}>{children}</ThemeProvider>;
}

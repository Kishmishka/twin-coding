import ReactDOM from 'react-dom/client';
import './index.css';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import App from './App';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F0F0F0',
            contrastText: '#fff',
        },
    },
});

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>,
    );
} else {
    console.error('Root element not found, cannot render the app.');
}

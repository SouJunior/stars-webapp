import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import 'react-toastify/dist/ReactToastify.css'

// Configurar Google Analytics
// import ReactGA from 'react-ga4'
// ReactGA.initialize('G-Z322K0TK90')

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

// Tema customizado (equivalente ao Vuetify theme)
const theme = createTheme({
  palette: {
    mode: localStorage.getItem('theme') === 'light' ? 'light' : 'dark',
    primary: {
      main: '#d7a006'
    },
    background: {
      default: '#212121'
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)

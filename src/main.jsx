import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.js';
import GlobalStyles from './styles/global.js';
import { Routes } from './routes'; // Importar as rotas
import { MyContext } from './myContext.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
        <MyContext.Provider value={ { name: "Leonardo Santos", email: "leo.santosp@outlook.com" } }>
          <Routes />
        </MyContext.Provider> 
    </ThemeProvider>
  </React.StrictMode>,
)

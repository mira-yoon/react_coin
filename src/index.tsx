import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import {ThemeProvider} from "styled-components";
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}> 
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
// <React.StrictMode> 지웠음. Coins.tsx에서 Link 눌렀을 때 url은 바뀌는데 랜더링이 안되는 이슈가 있어서 React.StrictMode 지웠다
// <ThemeProvider>로 감싸면 그 안에 있는 모든 컴포넌트들은 Theme Object에 접근할 수 있게 된다.

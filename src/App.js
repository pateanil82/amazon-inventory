import Router from "./route/Index";
import './general_styles.scss'
import ThemeProvider from "./layout/provider/Theme";
import ErrorBoundary from "./route/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
};
export default App;
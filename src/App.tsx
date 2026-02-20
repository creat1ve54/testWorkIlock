import { useEffect } from "react";
import AppRoutes from "./routes/Routes";
function App() {



  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || 'light';
    document.documentElement.setAttribute("data-theme", savedTheme);
    localStorage.setItem("theme", savedTheme);
  }, []);

  return (
    <div className="app">
      <div className="app__body">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;

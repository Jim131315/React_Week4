import { useState } from "react";
import LogginPage from "./pages/LogginPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";


function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {isAuth ? <ProductPage setIsAuth={setIsAuth} /> : <LogginPage setIsAuth={setIsAuth} />}

    </>
  );
}

export default App;
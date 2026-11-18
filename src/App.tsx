import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useSmoothScroll from "./hooks/useSmoothScroll";

function App() {
  useSmoothScroll();

  return (
    <>
      <Header />
      <main className="highContainer">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;

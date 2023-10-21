import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import ScrollToTop from "./components/ScrollToTop";
import PageNotFound from "./components/notfound/PageNotFound";

import Charge from "./pages/payment/Charge";

import ModalPayment from "./pages/payment/Payment";
import Register from "./pages/register/Register";
import GoogleMap from "./components/map/GoogleMap";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          {/* <Route path="/payment" element={<ModalPayment />} /> */}
          <Route path="/charge" element={<Charge />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/map" element={<GoogleMap />} /> */}
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;

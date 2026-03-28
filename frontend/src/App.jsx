import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrdersListPage from "./pages/OrdersListPage";
import OrderDetailPage from "./pages/OrderDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrdersListPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
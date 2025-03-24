import { Modal } from "./UI/Modal";
import { useContext } from "react";
import { UIContext } from "../context/UIContext";
import { CartContext } from "../context/CartContext";
import { useFetch } from "../hooks/useFetch";
const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export function Checkout() {
  const { uiProgress, hideCheckout } = useContext(UIContext);
  const { items, clearAll } = useContext(CartContext);
  const { data, isLoading, error, sendRequest } = useFetch(
    "http://localhost:3000/orders",
    config
  );

  function handleClose() {
    hideCheckout();
    clearAll();
  }
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      })
    );
  }

  if (data && !error) {
    return (
      <Modal open={uiProgress === "checkout"}>
        <h2>Sipariş Sonucu</h2>
        <p className="text-success">Siparişiniz alınmıştır. Teşekkür ederiz.</p>
        <button
          onClick={() => handleClose()}
          className="btn btn-sm btn-outline-danger me-2"
        >
          Kapat
        </button>
      </Modal>
    );
  }
  return (
    <Modal open={uiProgress === "checkout"}>
      <h2>Checkout</h2>
      <p className="text-danger">Sipariş Tutarınız: {cartTotal} ₺</p>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">{error}</span>
            </div>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Ad Soyad
          </label>
          <input type="text" className="form-control" id="name" name="name" />
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-Posta
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Telefon
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Adres
          </label>
          <textarea
            name="address"
            id="address"
            className="form-control"
          ></textarea>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                Şehir
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="district" className="form-label">
                Mahalle
              </label>
              <input
                type="text"
                className="form-control"
                id="district"
                name="district"
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-warning " role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => hideCheckout()}
              className="btn btn-sm btn-outline-danger me-2"
            >
              Kapat
            </button>
            <button type="submit" className="btn btn-sm btn-primary me-2">
              Kaydet
            </button>
          </>
        )}
      </form>
    </Modal>
  );
}

import Pizza from "./Pizza";
import { useFetch } from "../hooks/useFetch";
const config = {
  method: "GET",
};
export default function PizzaList() {
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/pizzas",
    config,
    []
  );
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-warning " role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">{error}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="pizza-list">
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
        {data.map((pizza) => (
          <Pizza pizza={pizza} key={pizza.id} />
        ))}
      </div>
    </div>
  );
}

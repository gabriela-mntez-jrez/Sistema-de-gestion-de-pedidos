const BASE_URL = "http://localhost:8080";

export async function getOrders() {
  const res = await fetch(`${BASE_URL}/orders`);
  return res.json();
}

export async function searchOrders(query) {
  const res = await fetch(`${BASE_URL}/orders/search?query=${encodeURIComponent(query)}`);
  return res.json();
}

export async function getOrderById(id) {
  const res = await fetch(`${BASE_URL}/orders/${id}`);
  return res.json();
}

export async function deleteOrder(id) {
  await fetch(`${BASE_URL}/orders/${id}`, {
    method: "DELETE",
  });
}

export async function updateOrder(id, order) {
  const res = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  return res.json();
}

const BASE_URL = "http://localhost:8080";

export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
}

export async function createUser(user) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) throw new Error("Error creando usuario");
  return response.json();
}

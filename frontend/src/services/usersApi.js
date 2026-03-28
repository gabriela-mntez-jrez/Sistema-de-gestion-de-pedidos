export async function getUsers() {
  const response = await fetch("http://localhost:8080/users");

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
}

export default function Home() {
  const user = localStorage.getItem("user");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido</h1>
      {user && <pre>{user}</pre>}
    </div>
  );
}
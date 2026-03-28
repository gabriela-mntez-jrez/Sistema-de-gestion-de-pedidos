function Layout({ title, children }) {
  return (
    <div className="container py-4">
      <h1 className="mb-4">{title}</h1>
      {children}
    </div>
  );
}

export default Layout;

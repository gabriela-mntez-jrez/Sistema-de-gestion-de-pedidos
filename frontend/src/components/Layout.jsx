function Layout({ title, children }) {
  return (
    <div className="container py-4">
      <div className="app-header shadow-sm">
        <h1 className="m-0">{title}</h1>
      </div>

      {children}
    </div>
  );
}

export default Layout;
export default function Alert({ children }) {
  return (
    <div
      role="alert"
      className="w-full rounded-card border border-danger/30 bg-danger/5 p-4 text-center text-sm font-medium text-danger"
    >
      {children}
    </div>
  );
}

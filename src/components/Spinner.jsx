export default function Spinner() {
  return (
    <div
      className="flex justify-center py-10"
      role="status"
      aria-label="Loading photos"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );
}

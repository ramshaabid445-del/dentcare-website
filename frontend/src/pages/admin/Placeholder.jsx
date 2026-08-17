export default function AdminPlaceholder({ title, description }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-heading text-brand-navy">{title}</h2>
        <p className="mt-1 text-sm text-brand-gray">{description}</p>
      </div>

      <div className="rounded-2xl bg-white shadow-md p-12 text-center">
        <div className="text-4xl">🚧</div>
        <h3 className="mt-4 text-xl font-heading text-brand-navy">Coming Soon</h3>
        <p className="mt-2 text-sm text-brand-gray max-w-md mx-auto">
          The {title.toLowerCase()} management functionality will be implemented in the next phase.
        </p>
      </div>
    </div>
  );
}
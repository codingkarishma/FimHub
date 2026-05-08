export default function StatBar({ items = [] }) {
  return (
    <section className="surface-panel p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.value} className="border-l border-[color:var(--fh-border)] pl-4">
            <p className="text-4xl font-bold text-[color:var(--fh-accent)] md:text-5xl">{item.value}</p>
            <p className="mt-3 text-sm leading-6 text-[color:var(--fh-text)]">{item.label}</p>
            {item.source && (
              <p className="mt-2 text-xs leading-5 text-[color:var(--fh-text-secondary)]">{item.source}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

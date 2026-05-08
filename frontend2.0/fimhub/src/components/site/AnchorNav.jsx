export default function AnchorNav({ items = [], activeId }) {
  return (
    <nav className="surface-panel p-5 xl:sticky xl:top-24">
      <p className="eyebrow text-[color:var(--fh-text-secondary)]">Contents</p>
      <div className="mt-5 space-y-2">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block border-l pl-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? 'border-[color:var(--fh-accent)] text-[color:var(--fh-text)]'
                  : 'border-transparent text-[color:var(--fh-text-secondary)] hover:border-[color:var(--fh-border-strong)] hover:text-[color:var(--fh-text)]'
              }`}
            >
              <span className="mr-2 text-xs font-semibold text-[color:var(--fh-accent)]">
                0{index + 1}
              </span>
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

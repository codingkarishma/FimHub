export default function TriviaHook({ title, statement, citation }) {
  return (
    <section className="border-l-2 border-[color:var(--fh-accent)] pl-5">
      {title && (
        <p className="eyebrow text-[color:var(--fh-accent)]">{title}</p>
      )}
      <p className="mt-3 text-lg leading-8 text-[color:var(--fh-text)]">{statement}</p>
      {citation && <p className="mt-3 text-sm leading-6 text-[color:var(--fh-text-secondary)]">{citation}</p>}
    </section>
  );
}

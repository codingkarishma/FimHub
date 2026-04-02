export default function SectionIntro({ eyebrow, title, description, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow text-[#0f766e]">{eyebrow}</p>}
      <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl lg:text-[3.35rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-8 text-slate-600 md:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}

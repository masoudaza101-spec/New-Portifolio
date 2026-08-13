type SectionHeadingProps = {
  index?: string;
  label: string;
  description?: string;
  className?: string;
};

export default function SectionHeading({
  index,
  label,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div>
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-10 bg-line" aria-hidden="true" />
          <span className="text-caps text-muted">
            {index ? `${index} — ` : ""}
            {label.split(" ")[0]}
          </span>
        </div>
        <h2 className="font-display text-display-xl uppercase tracking-tight">
          {label}
        </h2>
      </div>
      {description ? (
        <p className="max-w-md text-body text-muted md:pb-2">{description}</p>
      ) : null}
    </div>
  );
}

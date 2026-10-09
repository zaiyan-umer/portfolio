export default function SectionLoading({ label }: { label: string }) {
  return (
    <div className="portfolio-education-loading" role="status">
      <span>Loading {label}…</span>
      <div aria-hidden="true" />
    </div>
  );
}

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative overflow-hidden pb-24 pt-8 md:pt-10">
      <div
        aria-hidden="true"
        className="animate-orb-1 absolute -left-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1),transparent_70%)] blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="animate-orb-2 absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.14),transparent_70%)] blur-[100px]"
      />
      <div className="relative">{children}</div>
    </main>
  );
}

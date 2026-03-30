export default function AdminLandingPage() {
  return (
    <main className="admin-shell">
      <section className="hero-card">
        <p className="eyebrow">Zyntrip Admin</p>
        <h1>Next.js admin workspace scaffold</h1>
        <p>
          This app is the target home for dispatch, payments, support, analytics, and backoffice
          operations as the repo migrates from the current Vite shell into the closed production stack.
        </p>
        <ul>
          <li>Dispatch board</li>
          <li>Payments console</li>
          <li>Support and incident operations</li>
          <li>Admin analytics and system health</li>
        </ul>
      </section>
    </main>
  );
}

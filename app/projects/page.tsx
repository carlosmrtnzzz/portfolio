import ProjectsGrid from "@/components/Projectsgrid";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 pt-24 dark:bg-black">
      <section className="mx-auto max-w-7xl px-6">
        <h1 className="mb-12 text-6xl font-normal md:text-6xl">Proyectos</h1>
        <ProjectsGrid  />
      </section>
    </main>
  );
}

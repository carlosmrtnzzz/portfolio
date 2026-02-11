import ProjectsGrid from "@/components/ProjectsGrid";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24 pb-24">
      <section className="mx-auto max-w-5xl px-6">
        <h1 className="mb-12 text-3xl font-medium text-black dark:text-white">
          Proyectos
        </h1>

        <ProjectsGrid />
      </section>
    </main>
  );
}

import ProjectsScrollList from "@/components/ProjectsScrollList";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 pt-24 dark:bg-black">
      <section className="mx-auto max-w-7xl px-6">
        <h1 className="mb-12 font-serif text-6xl font-normal italic md:text-7xl">
          Proyectos
        </h1>
        <ProjectsScrollList />
      </section>
    </main>
  );
}
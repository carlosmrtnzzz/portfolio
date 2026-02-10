import ProjectsGrid from "@/components/ProjectsGrid"

export default function ProjectsPage() {
  return (
    <main className="bg-zinc-50 pt-24 pb-16 dark:bg-black">
      <section className="mx-auto max-w-5xl px-6">
        <h1 className="mb-12 text-3xl font-medium text-black dark:text-white">
          Projects
        </h1>

        <ProjectsGrid />
      </section>
    </main>
  )
}

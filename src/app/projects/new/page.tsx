import ProjectForm from "@/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">New Project</h1>
        <p className="text-sm text-muted-foreground">Create a new project.</p>
      </div>

      <div className="bg-card rounded-lg p-6">
        <ProjectForm />
      </div>
    </div>
  );
}

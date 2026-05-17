import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type Project = {
  id: number;
  title: string;
  description?: string | null;
  status?: string | null;
};

function statusClass(status?: string | null) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    case "archived":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*");

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-sm text-destructive">Failed to load projects.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">All projects from Supabase.</p>
        </div>

        <div>
          <Link href="/projects/new">
            <Button>New Project</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex w-full items-start justify-between gap-4">
                <div>
                  <CardTitle>{p.title}</CardTitle>
                </div>

                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusClass(
                      p.status
                    )}`}
                  >
                    {p.status ?? "unknown"}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardFooter className="justify-start items-center">
              {p.description ? (
                <div className="text-sm text-muted-foreground">{p.description}</div>
              ) : (
                <div />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

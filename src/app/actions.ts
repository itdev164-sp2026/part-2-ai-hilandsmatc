"use server"

import { projectSchema } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";

export async function createProject(data: unknown) {
  const parsed = projectSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid project data",
    };
  }

  const { error, data: inserted } = await supabase
    .from("projects")
    .insert([parsed.data])
    .select()
    .limit(1)
    .maybeSingle();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, project: inserted };
}

export default createProject;

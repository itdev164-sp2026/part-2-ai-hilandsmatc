"use client"

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { projectSchema, type Project } from "@/lib/schemas";
import { Field, FieldLabel, FieldError, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export const ProjectForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: { title: "", description: "", status: "active" },
  });

  async function onSubmit(data: Project) {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        toast.success("Project created");
        reset();
      } else {
        toast.error(json.error || "Failed to create project");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error creating project");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Toaster />

      <Field>
        <FieldLabel>Title</FieldLabel>
        <FieldContent>
          <Input placeholder="Project title" {...register("title")} />
          <FieldError errors={errors.title ? [{ message: errors.title.message }] : []} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <FieldContent>
          <Textarea placeholder="Project description" rows={4} {...register("description")} />
          <FieldError errors={errors.description ? [{ message: errors.description.message }] : []} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Status</FieldLabel>
        <FieldContent>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <FieldError errors={errors.status ? [{ message: (errors.status as any).message }] : []} />
        </FieldContent>
      </Field>

      <div className="flex items-center">
        <Button type="submit" disabled={isSubmitting}>
          Create Project
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;

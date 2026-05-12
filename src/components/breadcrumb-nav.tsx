"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbNav() {
  const pathname = usePathname()

  const segments = pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: segment,
    }))

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>
            {segments.length === 0 ? "Overview" : segments[segments.length - 1].name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

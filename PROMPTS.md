# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**

Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
Replace the current homepage content with a "Developer Profile" page for me.
It should include:
- My name: [Your Name]
- A short bio (1-2 sentences about being a web development student)
- A "Skills" section that displays at least 6 skills in a responsive
  Tailwind CSS grid (use cards with icons from lucide-react)

Keep the existing Header component and layout structure intact.
If you need to create new components, go ahead and create them in
the src/components/ folder.


**What happened:**

Updated page.tsx — Replaced the course dashboard with a profile page featuring:

Your name (Sarah) with a tagline
A 2-sentence bio about being a web development student focusing on AI-native full-stack development
A "Skills" section displaying 6 skills: React, TypeScript, Next.js, Tailwind CSS, Database Design, and AI Integration
Created skill-card.tsx — A new reusable component that displays each skill with:

A Lucide React icon
Skill name and description
Hover effects matching your existing design system
Responsive grid layout (2 columns on mobile, 3 on desktop)
The layout structure, Header component, and theme system remain completely intact. All styling uses Tailwind utility classes and follows your project conventions.

It did everything correctly, but we all ran the second prompt in class to see what it would give us as a result


### Prompt 2
**What I asked:**

The skills grid should use sm:grid-cols-2 lg:grid-cols-3 for responsive
breakpoints. Can you update that?


**What happened:**

it rescanned the code to ensure it had already implemented the change correctly, then reported that everything was originally ok


### Reflection

It was interesting seeing how our results all varied. It will be interesting to see how similar/different our end results are after a few more assignments. I'm only 2 prompts in, so I don't know how well I like it yet, but we'll see where we go from here



## Activity 2: Building the Fashboard Shell

### Prompt 1

**What I asked:**

Using the shadcn sidebar components that are now in my src/components/ui/ folder,
create a professional, collapsible dashboard layout. It should include:

A sidebar (src/components/app-sidebar.tsx) with navigation links for:

Overview (use the Home icon from lucide-react)
Projects (use the FolderOpen icon)
Settings (use the Settings icon)
A top navigation area with breadcrumbs showing the current page.

A main content area that wraps the existing page content.

Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

Important: Preserve the Developer Profile content from Activity 1 in
src/app/page.tsx — it should appear in the main content area of the new layout.
Keep the dark mode toggle working.

**What happened:**

Summary of changes:

✅ Created app-sidebar.tsx

Professional sidebar with user profile header (Sarah - Developer)
Navigation menu with:
Overview (Home icon)
Projects (FolderOpen icon)
Settings (Settings icon)
Active page highlighting
Responsive collapsible design with tooltips
✅ Created breadcrumb-nav.tsx

Dynamic breadcrumb navigation showing current page
Uses usePathname to determine active route
Displays "Overview" for home page, "Projects" for projects, etc.
✅ Updated layout.tsx

Wraps app with SidebarProvider for state management
Adds AppSidebar component
Creates top header with:
SidebarTrigger for mobile hamburger menu
BreadcrumbNav for page navigation
ModeToggle for dark mode (preserved functionality)
Uses SidebarInset for responsive main content area
Maintains existing font configuration and theme provider
✅ Preserved Developer Profile

Your existing page.tsx content (Skills section) is displayed in the main content area
Features:

📱 Fully responsive: Sidebar collapses to mobile sheet on small screens
🎨 Dark mode compatible: Toggle works in the header
⌨️ Keyboard shortcut: Ctrl+B (or Cmd+B) toggles sidebar
🎯 Active link highlighting: Shows which page you're on
📍 Breadcrumb navigation: Shows current page at the top
🔧 Professional styling: Uses Tailwind utility classes and shadcn components
The layout is now ready for your Projects and Settings pages!

After this, I saw that I had a runtime error involving tooltips and asked it to fix that for me, which left everything running as it should

### Prompt 2

**What I asked:**

The sidebar does not close on mobile when clicking the Overview menu item
because it links to "/" which is already the current page. Fix this so the
sidebar closes on mobile when any menu item is clicked, even if it links
to the current page.

**What happened:**

As mentioned in the assignment instructions, the AI gave na overcomplicated fix which I undid and then directed it to do the simpler fix with the "onClick" handler

### Reflection

I'm not sure if the initial error I had was from the AI or from an issue I had before that I didn't notice, but it was able to fix it just fine. The AI has been convenient for troubleshooting, and I like that there's the simple undo button that you can use instead of manually hunting down every change it made if I encounter an error



## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

Using the Supabase client at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

1. Fetches all records from the "projects" table in Supabase
2. Displays them in a professional layout using shadcn/ui Card components
   (run `npx shadcn@latest add card` if needed)
3. Each card should show the project title, description, and a status badge
4. The status badge should be color-coded:
   - "active" = green
   - "completed" = blue
   - "archived" = gray

Use @workspace context to match the styling of our existing Dashboard.
This must be a React Server Component (async function, no "use client").
Do NOT use useEffect or useState for data fetching.


**What happened:**

The agent did everything as expected except for an error with the following lines where it formatted the call wrong, but I just modified it myself to match what was recommended in the assignment instructions

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("projects")   <-- extra line was here
    .select("*");


I also ran the follow-up prompt to fix the breadcrumbs which went smoothly

### Prompt 2

**What I asked:**

(as three separate prompts in succession)

the boxes feel a bit cluttered on the page, could you try moving the description down to the same box s the status?

please make the project names more vertically centered within the box, they are too close to the top edge

please move the status to the top part of the box next to the project name, still right justified

**What happened:**

The AI made the adjustments as I requested them without breaking anything

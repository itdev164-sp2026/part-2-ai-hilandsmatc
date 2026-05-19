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


##########################################


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


##########################################


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


##########################################


## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**

Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project"
with the following fields:

title: string, minimum 3 characters, with a custom error message
"Title must be at least 3 characters"
description: string, minimum 10 characters, with a custom error message
"Description must be at least 10 characters"
status: enum with values "active", "completed", "archived"
Export the schema and also export the inferred TypeScript type using z.infer.

**What happened:**

The agent created the schema correctly with no errors

### Prompt 2

**What I asked:**

Using the Zod schema from src/lib/schemas.ts, do the following:

Create a form component at src/components/project-form.tsx that:

Is a Client Component ("use client") because it uses react-hook-form hooks
Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
Uses shadcn/ui Input for title, Textarea for description, and Select for status
Shows inline error messages under each field when validation fails
Has a "Create Project" submit button
Shows a sonner toast notification on successful submission
Create a Server Action at src/app/actions.ts that:

Has "use server" at the top of the file
Accepts the validated form data
Validates it again with the Zod schema (server-side validation)
Inserts the validated data into the Supabase "projects" table
Returns a success or error response
Create a new page at src/app/projects/new/page.tsx that renders
the project form within the dashboard layout.

Add a "New Project" button to the existing projects page
(src/app/projects/page.tsx) that links to /projects/new.

Use @workspace to match the existing project styling.

**What happened:**

The Agent seemed to handle the longer task list pretty well. I wasn't fully confident with the server-side validation, so I ran the followup command just to be sure it worked

### Prompt 3 (if applicable)

**What I asked:**

The Server Action should validate the form data with the Zod schema
before inserting into Supabase. Never trust client-side validation alone —
always re-validate on the server. Add projectSchema.safeParse() to the
action and return an error if validation fails.

**What happened:**

"I’m tightening the server action so it re-validates with safeParse before any Supabase write, then I’ll run a narrow type/error check on the touched file.

Updated actions.ts and added server action to Supabase+10-4
The server-side validation is in place now. I’m checking the edited file for type or lint issues before I wrap up.

Reviewed actions.ts and planned server action insertion
actions.ts now re-validates with projectSchema.safeParse() before any Supabase insert. If validation fails, it returns a structured error immediately instead of trusting the client payload.

I also checked the file for errors and it’s clean." - The Agent

### Reflection

I definitely understand the appeal of the double-validation. As a user I appreciate the instant feedback, but as a developer, I am a big fan of keeping the database protected from the Evil Forces.


############################################


## Activity 5: Securing the App with Supabase Auth

### Prompt 1

**What I asked:**

## Activity 5: Securing the App with Supabase Auth

### Prompt 1

**What I asked:**

Implement a complete email/password authentication flow for this Next.js 15
App Router project using @supabase/ssr. Here is what I need:

1. SUPABASE CLIENTS: Create server-side Supabase client utilities in
   src/lib/supabase/ that work correctly with Next.js cookies. I need
   separate clients for Server Components, Server Actions, and Middleware.

2. LOGIN PAGE: Create a page at src/app/(auth)/login/page.tsx with a
   shadcn/ui card-based login form. It should support both "Sign In"
   and "Sign Up" (toggle between them or use tabs). Handle the auth
   via Server Actions, not client-side fetch.

3. MIDDLEWARE: Create a middleware.ts file at src/middleware.ts (next to
   the app directory — Next.js looks for middleware as a sibling of app)
   that:
   - Refreshes the user's auth session on every request
   - Protects the /projects routes — redirect unauthenticated users to /login
   - Allows unauthenticated access to /login
   - Uses supabase.auth.getUser() (NOT getSession()) for verification

4. SIGN OUT: Add a "Sign Out" button to the existing sidebar component
   (src/components/app-sidebar.tsx) that calls a Server Action to sign
   the user out and redirect to /login. The button must only render
   when an authenticated user is present — pass the user as a prop from
   the root layout (which will need to fetch it via the server Supabase
   client) and gate the Sign Out UI on that prop.

5. UPDATE DATA QUERIES: Modify the projects page and the create-project
   Server Action to use the authenticated Supabase client so that RLS
   policies filter data per user.

Use @workspace to understand the existing project structure. Do not remove
or break existing functionality — integrate auth around it.

**What happened:**

The only error I spotted after the first prompt was that middleware.ts was created in the project folder instead of in src

I just dragged it into place myself instead of writing more prompts

### Reflection

I was definitely surprised at the number of files that were created or modified to make the change happen.


##################################################


## Activity 6: Deployment, Webhooks, & AI-Testing

### Prompt 1

**What I asked:**

I have a Next.js app with Supabase Auth. Using @workspace context to
understand the app structure, write an End-to-End (E2E) test file at
tests/auth.spec.ts using Playwright.

The tests should verify:

1. LOGIN PAGE VISIBLE: Navigate to /login and confirm the login form
   is visible (check for email input, password input, and submit button).

2. REDIRECT AFTER LOGIN: After a successful login with valid credentials,
   the user is redirected to the dashboard or projects page.

3. SIDEBAR NAVIGATION: After login, verify that the sidebar navigation
   links are visible: "Overview", "Projects", and "Settings".

Requirements:
- Use role-based locators (getByRole, getByLabel, getByText) instead of
  CSS selectors or test IDs. This makes tests more accessible and resilient
  to UI changes.
- Add clear test descriptions that explain what each test verifies.
- Handle the async nature of navigation and page loads with proper
  Playwright waiting strategies.
- Read test credentials from process.env.TEST_USER_EMAIL and
  process.env.TEST_USER_PASSWORD. Do not hardcode credentials. If those
  variables are not set, the credentialed tests should skip with a clear
  message rather than fail.


**What happened:**

The first test failed which caused it to skip the next two

### Prompt 2

**What I asked:**

This Playwright test is failing with the following error:
tests\auth.spec.ts:7:7 › Authentication E2E › LOGIN PAGE VISIBLE — shows email, password and submit button

Look at the actual component code in @workspace and fix the test
to match the real UI. Use role-based locators.

**What happened:**

after allowing it to run a few commands to diagnose the issue, it was able to get the first test to pass, but the other two tests were still skipping (i didn't save the edits to .env.local so the test couldn't read the login info i gave it)

after figuring that out, everything went fine

### Reflection

it was definitely handy to have the AI because it caught mistakes that I made, but I felt a kind of removed from the process having the AI do all of the test writing and then the actual testing

### Course Reflection

I have definitely started taking things more step-by-step with my prompting and gotten better at it along the way. I still try to avoid using AI where I can ebcause I don't want to become too reliant on it, and I loathe the environmental impact it is causing with the water consumption and the new data centers and so on, but it is still a very useful tool and a helpful coding assistant

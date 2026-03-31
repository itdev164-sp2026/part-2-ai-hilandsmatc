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
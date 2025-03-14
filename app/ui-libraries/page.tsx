import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const uiLibraries = [
  {
    name: "Tailwind CSS",
    description:
      "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    category: "CSS Framework",
    features: [
      "Utility-first",
      "Responsive",
      "Customizable",
      "Dark mode",
      "JIT compiler",
    ],
    url: "https://tailwindcss.com/",
    popularity: "Very High",
  },
  {
    name: "shadcn/ui",
    description:
      "A collection of re-usable components built using Radix UI and Tailwind CSS. Not a component library, but a collection of components you can copy and paste into your apps.",
    category: "Component Collection",
    features: [
      "Accessible",
      "Customizable",
      "Tailwind CSS",
      "Radix UI primitives",
      "Themeable",
    ],
    url: "https://ui.shadcn.com/",
    popularity: "High",
  },
  {
    name: "Material UI",
    description:
      "A comprehensive library of components that features implementation of Google's Material Design system.",
    category: "Component Library",
    features: [
      "Comprehensive",
      "Material Design",
      "Customizable",
      "Accessible",
      "TypeScript support",
    ],
    url: "https://mui.com/",
    popularity: "Very High",
  },
  {
    name: "Chakra UI",
    description:
      "A simple, modular and accessible component library that gives you the building blocks to build React applications with speed.",
    category: "Component Library",
    features: [
      "Accessible",
      "Themeable",
      "Composable",
      "Dark mode",
      "Responsive",
    ],
    url: "https://chakra-ui.com/",
    popularity: "High",
  },
  {
    name: "Radix UI",
    description:
      "A low-level UI component library with a focus on accessibility, customization and developer experience.",
    category: "Headless Components",
    features: [
      "Accessible",
      "Unstyled",
      "Customizable",
      "Composable",
      "TypeScript support",
    ],
    url: "https://www.radix-ui.com/",
    popularity: "High",
  },
  {
    name: "Framer Motion",
    description:
      "A production-ready motion library for React that makes creating animations easy.",
    category: "Animation",
    features: [
      "Declarative",
      "Gestures",
      "Variants",
      "Layout animations",
      "SVG animations",
    ],
    url: "https://www.framer.com/motion/",
    popularity: "High",
  },
  {
    name: "Styled Components",
    description:
      "Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress.",
    category: "CSS-in-JS",
    features: [
      "Component-based",
      "Dynamic styling",
      "Themeable",
      "Server-side rendering",
      "Automatic vendor prefixing",
    ],
    url: "https://styled-components.com/",
    popularity: "High",
  },
  {
    name: "Emotion",
    description:
      "A library designed for writing CSS styles with JavaScript. It provides powerful and predictable style composition.",
    category: "CSS-in-JS",
    features: [
      "Composable",
      "Flexible",
      "Performance focused",
      "Server-side rendering",
      "Source maps",
    ],
    url: "https://emotion.sh/",
    popularity: "Medium",
  },
  {
    name: "NextUI",
    description:
      "Beautiful, fast and modern React UI library that allows you to create beautiful websites regardless of your design experience.",
    category: "Component Library",
    features: [
      "Modern design",
      "Customizable",
      "Dark mode",
      "Accessible",
      "TypeScript support",
    ],
    url: "https://nextui.org/",
    popularity: "Medium",
  },
  {
    name: "Mantine",
    description:
      "A fully featured React components library with 100+ customizable components and hooks.",
    category: "Component Library",
    features: [
      "100+ components",
      "Hooks library",
      "Dark mode",
      "Accessible",
      "TypeScript support",
    ],
    url: "https://mantine.dev/",
    popularity: "Medium",
  },
  {
    name: "React Hook Form",
    description:
      "Performant, flexible and extensible forms with easy-to-use validation.",
    category: "Form Library",
    features: [
      "Performance focused",
      "Minimal re-renders",
      "Easy validation",
      "TypeScript support",
      "Small bundle size",
    ],
    url: "https://react-hook-form.com/",
    popularity: "High",
  },
  {
    name: "Formik",
    description:
      "Build forms in React, without the tears. Formik takes care of the repetitive and annoying stuff.",
    category: "Form Library",
    features: [
      "Form state management",
      "Validation",
      "Error handling",
      "TypeScript support",
      "Integration with UI libraries",
    ],
    url: "https://formik.org/",
    popularity: "High",
  },
  {
    name: "Ant Design",
    description:
      "An enterprise-class UI design language and React UI library with a set of high-quality components.",
    category: "Component Library",
    features: [
      "Enterprise-ready",
      "Comprehensive",
      "Customizable",
      "TypeScript support",
      "Internationalization",
    ],
    url: "https://ant.design/",
    popularity: "Very High",
  },
  {
    name: "Bootstrap",
    description:
      "The world's most popular framework for building responsive, mobile-first sites with React Bootstrap integration.",
    category: "CSS Framework",
    features: [
      "Responsive",
      "Mobile-first",
      "Comprehensive",
      "Customizable",
      "Well-documented",
    ],
    url: "https://getbootstrap.com/",
    popularity: "Very High",
  },
  {
    name: "Headless UI",
    description:
      "Completely unstyled, fully accessible UI components, designed to integrate with Tailwind CSS.",
    category: "Headless Components",
    features: [
      "Accessible",
      "Unstyled",
      "Tailwind integration",
      "TypeScript support",
      "React & Vue versions",
    ],
    url: "https://headlessui.com/",
    popularity: "High",
  },
  {
    name: "daisyUI",
    description:
      "The most popular component library for Tailwind CSS with semantic class names.",
    category: "Tailwind Plugin",
    features: [
      "Tailwind CSS",
      "Semantic classes",
      "Customizable",
      "Theme generator",
      "Small footprint",
    ],
    url: "https://daisyui.com/",
    popularity: "Medium",
  },
  {
    name: "Tremor",
    description:
      "A React library to build dashboards fast. Modular components for data visualization and exploration.",
    category: "Dashboard Components",
    features: [
      "Data visualization",
      "Charts",
      "KPI cards",
      "Tables",
      "Tailwind CSS integration",
    ],
    url: "https://www.tremor.so/",
    popularity: "Medium",
  },
  {
    name: "Primer React",
    description:
      "GitHub's design system and React implementation, built for GitHub's web interfaces.",
    category: "Component Library",
    features: [
      "GitHub's design system",
      "Accessible",
      "Composable",
      "TypeScript support",
      "Themeable",
    ],
    url: "https://primer.style/react/",
    popularity: "Medium",
  },
  {
    name: "Semantic UI React",
    description:
      "The official React integration for Semantic UI, a development framework for creating beautiful layouts.",
    category: "Component Library",
    features: [
      "Semantic markup",
      "Comprehensive",
      "Themeable",
      "jQuery-free",
      "Declarative API",
    ],
    url: "https://react.semantic-ui.com/",
    popularity: "Medium",
  },
  {
    name: "Fluent UI",
    description:
      "Microsoft's collection of UX frameworks for creating beautiful, cross-platform apps that share code and design.",
    category: "Component Library",
    features: [
      "Microsoft design language",
      "Accessible",
      "Cross-platform",
      "Customizable",
      "Enterprise-ready",
    ],
    url: "https://developer.microsoft.com/en-us/fluentui",
    popularity: "Medium",
  },
  {
    name: "Evergreen",
    description:
      "A design system for enterprise-grade web applications by Segment.",
    category: "Component Library",
    features: [
      "Enterprise-focused",
      "Composable",
      "Accessible",
      "Themeable",
      "TypeScript support",
    ],
    url: "https://evergreen.segment.com/",
    popularity: "Medium",
  },
  {
    name: "Theme UI",
    description:
      "A constraint-based design system for building consistent, themeable React apps.",
    category: "CSS-in-JS",
    features: [
      "Theme-based",
      "Responsive",
      "Variant support",
      "MDX integration",
      "Design tokens",
    ],
    url: "https://theme-ui.com/",
    popularity: "Medium",
  },
  {
    name: "Stitches",
    description:
      "CSS-in-JS with near-zero runtime, SSR, multi-variant support, and a best-in-class developer experience.",
    category: "CSS-in-JS",
    features: [
      "Near-zero runtime",
      "Variants",
      "Server-side rendering",
      "TypeScript support",
      "Theming",
    ],
    url: "https://stitches.dev/",
    popularity: "Medium",
  },
  {
    name: "Vanilla Extract",
    description:
      "Zero-runtime Stylesheets-in-TypeScript with static CSS extraction.",
    category: "CSS-in-TS",
    features: [
      "Zero-runtime",
      "Type safety",
      "Static extraction",
      "Theming",
      "CSS variables",
    ],
    url: "https://vanilla-extract.style/",
    popularity: "Medium",
  },
  {
    name: "Panda CSS",
    description:
      "A universal, type-safe CSS-in-JS framework with a focus on runtime performance and developer experience.",
    category: "CSS-in-JS",
    features: [
      "Type-safe",
      "Zero-runtime",
      "Style props",
      "Responsive utilities",
      "Design tokens",
    ],
    url: "https://panda-css.com/",
    popularity: "Medium",
  },
  {
    name: "Tailwind Elements",
    description:
      "Bootstrap components recreated with Tailwind CSS, but with better design and more functionalities.",
    category: "Tailwind Plugin",
    features: [
      "Bootstrap-like",
      "Tailwind CSS",
      "Responsive",
      "Customizable",
      "Rich components",
    ],
    url: "https://tailwind-elements.com/",
    popularity: "Medium",
  },
  {
    name: "Ariakit",
    description:
      "Toolkit for building accessible UI components with React. Formerly Reakit.",
    category: "Headless Components",
    features: [
      "Accessible",
      "Composable",
      "Unstyled",
      "TypeScript support",
      "WAI-ARIA compliant",
    ],
    url: "https://ariakit.org/",
    popularity: "Medium",
  },
  {
    name: "React Aria",
    description:
      "A library of React Hooks that provides accessible UI primitives for your design system.",
    category: "Headless Components",
    features: [
      "Accessible",
      "Unstyled",
      "Behavior hooks",
      "Internationalization",
      "Mobile support",
    ],
    url: "https://react-spectrum.adobe.com/react-aria/",
    popularity: "Medium",
  },
  {
    name: "Tamagui",
    description:
      "Universal UI kit for React Native & Web with an optimizing compiler.",
    category: "Cross-platform",
    features: [
      "React Native",
      "Web",
      "Compiler",
      "Themeable",
      "Optimized runtime",
    ],
    url: "https://tamagui.dev/",
    popularity: "Medium",
  },
  {
    name: "Kuma UI",
    description:
      "Lightweight React components with a focus on performance and developer experience.",
    category: "Component Library",
    features: [
      "Lightweight",
      "Performance-focused",
      "TypeScript support",
      "Themeable",
      "Responsive",
    ],
    url: "https://www.kuma-ui.com/",
    popularity: "Low",
  },
  {
    name: "Geist UI",
    description:
      "An open-source design system for building modern websites and applications.",
    category: "Component Library",
    features: [
      "Minimalist design",
      "Dark mode",
      "Customizable",
      "TypeScript support",
      "Responsive",
    ],
    url: "https://geist-ui.dev/",
    popularity: "Low",
  },
  {
    name: "Grommet",
    description:
      "A react-based framework that provides accessibility, modularity, responsiveness, and theming.",
    category: "Component Library",
    features: [
      "Accessible",
      "Responsive",
      "Themeable",
      "Mobile-first",
      "Design tools",
    ],
    url: "https://v2.grommet.io/",
    popularity: "Medium",
  },
  {
    name: "Rebass",
    description:
      "React primitive UI components built with styled-system, designed for speed, consistency, and flexibility.",
    category: "Primitive Components",
    features: [
      "Primitive components",
      "Styled-system",
      "Themeable",
      "Responsive",
      "Minimal",
    ],
    url: "https://rebassjs.org/",
    popularity: "Medium",
  },
  {
    name: "Zag.js",
    description:
      "A framework-agnostic toolkit for building UI components with a focus on interactions and accessibility.",
    category: "Headless Components",
    features: [
      "Framework-agnostic",
      "State machines",
      "Accessible",
      "Composable",
      "Unstyled",
    ],
    url: "https://zagjs.com/",
    popularity: "Low",
  },
  {
    name: "Twind",
    description:
      "The smallest, fastest, most feature complete Tailwind-in-JS solution in existence.",
    category: "CSS-in-JS",
    features: [
      "Tailwind-in-JS",
      "Zero-runtime option",
      "TypeScript support",
      "Small size",
      "No build step",
    ],
    url: "https://twind.dev/",
    popularity: "Low",
  },
  {
    name: "Twin.macro",
    description:
      "Twin blends the magic of Tailwind with the flexibility of css-in-js.",
    category: "CSS-in-JS",
    features: [
      "Tailwind + CSS-in-JS",
      "Styled-components",
      "Emotion",
      "Zero-runtime option",
      "TypeScript support",
    ],
    url: "https://github.com/ben-rogerson/twin.macro",
    popularity: "Medium",
  },
  {
    name: "Windi CSS",
    description:
      "Next generation utility-first CSS framework, alternative to Tailwind with on-demand generation.",
    category: "CSS Framework",
    features: [
      "Utility-first",
      "On-demand",
      "Faster than Tailwind",
      "Attributify mode",
      "Variant groups",
    ],
    url: "https://windicss.org/",
    popularity: "Medium",
  },
  {
    name: "UnoCSS",
    description:
      "Instant on-demand atomic CSS engine with high performance and flexibility.",
    category: "CSS Framework",
    features: [
      "Atomic CSS",
      "On-demand",
      "Customizable",
      "Presets",
      "Extremely fast",
    ],
    url: "https://unocss.dev/",
    popularity: "Medium",
  },
  {
    name: "Kobalte",
    description:
      "UI toolkit for building accessible web apps and design systems with SolidJS.",
    category: "Headless Components",
    features: [
      "SolidJS",
      "Accessible",
      "Unstyled",
      "Composable",
      "TypeScript support",
    ],
    url: "https://kobalte.dev/",
    popularity: "Low",
  },
  {
    name: "Aceternity UI",
    description:
      "A collection of modern UI components with beautiful animations and effects, designed to work seamlessly with Next.js and Tailwind CSS.",
    category: "Component Collection",
    features: [
      "Modern animations",
      "Copy-paste components",
      "Tailwind CSS",
      "Next.js optimized",
      "Beautiful effects",
    ],
    url: "https://ui.aceternity.com/",
    popularity: "Medium",
  },
  {
    name: "next-ui",
    description:
      "A React UI library built on top of Tailwind CSS specifically designed for Next.js applications.",
    category: "Component Library",
    features: [
      "Next.js optimized",
      "Tailwind CSS",
      "Server Components",
      "App Router support",
      "TypeScript support",
    ],
    url: "https://nextui.org/",
    popularity: "High",
  },
  {
    name: "Vercel UI",
    description:
      "Vercel's design system and component library used for Vercel's own products and websites.",
    category: "Design System",
    features: [
      "Next.js optimized",
      "Vercel design language",
      "Dark mode",
      "Accessible",
      "Modern design",
    ],
    url: "https://vercel.com/design",
    popularity: "Medium",
  },
  {
    name: "Nextra",
    description:
      "A Next.js static site generator ideal for documentation and blogs with MDX support.",
    category: "Documentation Framework",
    features: [
      "Next.js based",
      "MDX support",
      "Documentation themes",
      "Blog themes",
      "Fast builds",
    ],
    url: "https://nextra.site/",
    popularity: "Medium",
  },
  {
    name: "Contentlayer",
    description:
      "Content SDK that validates and transforms your content into type-safe JSON data you can easily import into your Next.js application.",
    category: "Content Management",
    features: [
      "Next.js optimized",
      "Type-safe content",
      "MDX support",
      "Content validation",
      "Fast builds",
    ],
    url: "https://contentlayer.dev/",
    popularity: "Medium",
  },
  {
    name: "Clerk",
    description:
      "Complete user management UIs and APIs, purpose-built for Next.js applications.",
    category: "Authentication UI",
    features: [
      "Next.js optimized",
      "Authentication UI",
      "User management",
      "App Router support",
      "Edge compatibility",
    ],
    url: "https://clerk.com/",
    popularity: "High",
  },
  {
    name: "Tremor",
    description:
      "The React library to build dashboards fast. Integrates perfectly with Next.js and Tailwind CSS.",
    category: "Dashboard Components",
    features: [
      "Next.js optimized",
      "Data visualization",
      "Dashboard components",
      "Tailwind CSS",
      "Server Component support",
    ],
    url: "https://www.tremor.so/",
    popularity: "High",
  },
  {
    name: "Reshaped",
    description:
      "A React component library built for product teams, with excellent Next.js support.",
    category: "Component Library",
    features: [
      "Next.js optimized",
      "Accessible",
      "Customizable",
      "TypeScript support",
      "Design tokens",
    ],
    url: "https://reshaped.so/",
    popularity: "Medium",
  },
  {
    name: "Geist UI for Next.js",
    description:
      "An open-source design system specifically optimized for Next.js applications.",
    category: "Component Library",
    features: [
      "Next.js optimized",
      "Minimalist design",
      "Dark mode",
      "Server Components",
      "App Router support",
    ],
    url: "https://geist-ui.dev/",
    popularity: "Medium",
  },
  {
    name: "Flowbite React",
    description:
      "Open-source UI component library built with Tailwind CSS and React, with excellent Next.js integration.",
    category: "Component Library",
    features: [
      "Next.js compatible",
      "Tailwind CSS",
      "Responsive",
      "Accessible",
      "Extensive components",
    ],
    url: "https://flowbite-react.com/",
    popularity: "Medium",
  },
  {
    name: "Tailwind UI",
    description:
      "Official premium component library from the creators of Tailwind CSS, with beautifully designed components and templates.",
    category: "Tailwind Components",
    features: [
      "Official Tailwind product",
      "Premium quality",
      "Responsive",
      "Accessible",
      "Next.js compatible",
    ],
    url: "https://tailwindui.com/",
    popularity: "Very High",
  },
  {
    name: "Preline UI",
    description:
      "Open-source UI component library for Tailwind CSS featuring fully responsive, accessible components.",
    category: "Tailwind Components",
    features: [
      "Open-source",
      "Responsive",
      "Accessible",
      "Dark mode",
      "Customizable",
    ],
    url: "https://preline.co/",
    popularity: "Medium",
  },
  {
    name: "HyperUI",
    description:
      "Free open source Tailwind CSS component library with hundreds of responsive components for building modern interfaces.",
    category: "Tailwind Components",
    features: [
      "Free",
      "Open-source",
      "Responsive",
      "Extensive collection",
      "Copy-paste ready",
    ],
    url: "https://www.hyperui.dev/",
    popularity: "Medium",
  },
  {
    name: "Tailblocks",
    description:
      "Ready-to-use Tailwind CSS blocks and components that you can drop into your projects.",
    category: "Tailwind Components",
    features: [
      "Ready-to-use blocks",
      "Responsive",
      "Customizable",
      "Copy-paste",
      "Open-source",
    ],
    url: "https://tailblocks.cc/",
    popularity: "Medium",
  },
  {
    name: "Meraki UI",
    description:
      "Beautiful Tailwind CSS components that support RTL languages and fully responsive based on Flexbox & CSS Grid.",
    category: "Tailwind Components",
    features: ["RTL support", "Responsive", "Flexbox", "CSS Grid", "Dark mode"],
    url: "https://merakiui.com/",
    popularity: "Medium",
  },
  {
    name: "Tailwind Toolbox",
    description:
      "Free Tailwind CSS templates, components, and resources to jumpstart your projects.",
    category: "Tailwind Resources",
    features: [
      "Free templates",
      "Components",
      "Starter kits",
      "Utilities",
      "Resources",
    ],
    url: "https://www.tailwindtoolbox.com/",
    popularity: "Medium",
  },
  {
    name: "Kutty",
    description:
      "Tailwind plugin with accessible and reusable components for building web applications.",
    category: "Tailwind Plugin",
    features: [
      "Accessible",
      "Reusable",
      "Alpine.js integration",
      "Customizable",
      "Lightweight",
    ],
    url: "https://kutty.netlify.app/",
    popularity: "Low",
  },
  {
    name: "Tailgrids",
    description:
      "Ready-to-use Tailwind CSS UI components and templates for your next project.",
    category: "Tailwind Components",
    features: [
      "UI components",
      "Templates",
      "Marketing sections",
      "Responsive",
      "Modern design",
    ],
    url: "https://tailgrids.com/",
    popularity: "Medium",
  },
  {
    name: "Kometa UI Kit",
    description:
      "Tailwind CSS components with a unique design system for modern web applications.",
    category: "Tailwind Components",
    features: [
      "Unique design",
      "Responsive",
      "Customizable",
      "Dark mode",
      "Accessible",
    ],
    url: "https://kitwind.io/products/kometa",
    popularity: "Medium",
  },
  {
    name: "Flowrift",
    description:
      "Beautifully designed Tailwind CSS UI components and templates for modern applications.",
    category: "Tailwind Components",
    features: [
      "Beautiful design",
      "Copy-paste",
      "Responsive",
      "Customizable",
      "Modern",
    ],
    url: "https://flowrift.com/",
    popularity: "Medium",
  },
  {
    name: "Mamba UI",
    description:
      "Free, open-source collection of UI components and templates based on Tailwind CSS.",
    category: "Tailwind Components",
    features: [
      "Open-source",
      "Free",
      "Responsive",
      "Dark mode",
      "Copy-paste ready",
    ],
    url: "https://mambaui.com/",
    popularity: "Medium",
  },
  {
    name: "Tailwind Components",
    description:
      "Community-driven, searchable directory of Tailwind CSS components, templates, and resources.",
    category: "Tailwind Resources",
    features: [
      "Community-driven",
      "Searchable",
      "Free",
      "Diverse collection",
      "Code snippets",
    ],
    url: "https://tailwindcomponents.com/",
    popularity: "High",
  },
  {
    name: "a17t",
    description:
      "Atomic design toolkit built on Tailwind CSS that prioritizes pragmatic, accessible, and composable design.",
    category: "Tailwind Toolkit",
    features: [
      "Atomic design",
      "Accessible",
      "Composable",
      "Pragmatic",
      "Customizable",
    ],
    url: "https://a17t.miles.land/",
    popularity: "Low",
  },
  {
    name: "Tailwind Templates",
    description:
      "Collection of free and premium Tailwind CSS templates for various types of projects.",
    category: "Tailwind Resources",
    features: [
      "Templates",
      "Responsive",
      "Various categories",
      "Free & premium",
      "Ready-to-use",
    ],
    url: "https://tailwindtemplates.co/",
    popularity: "Medium",
  },
  {
    name: "Lofi UI",
    description:
      "Low-fidelity Tailwind CSS components that are easily customizable and perfect for prototyping.",
    category: "Tailwind Components",
    features: [
      "Low-fidelity",
      "Prototyping",
      "Customizable",
      "Minimal",
      "Fast implementation",
    ],
    url: "https://lofiui.com/",
    popularity: "Low",
  },
];

export default function UILibrariesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          UI Libraries for Next.js
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl">
          Discover popular UI libraries and styling solutions to enhance your
          Next.js projects.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {uiLibraries.map((library, index) => (
          <Card key={index} className="flex flex-col h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{library.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {library.category}
                  </CardDescription>
                </div>
                <Badge variant="outline">{library.popularity}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground mb-4">
                {library.description}
              </p>
              <div>
                <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {library.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="default" className="w-full">
                <a
                  href={library.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Visit Documentation
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

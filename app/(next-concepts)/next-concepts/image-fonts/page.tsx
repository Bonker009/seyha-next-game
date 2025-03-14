import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { FontDemo } from "./font-demo";

export const metadata = {
  title: "Image & Font Optimization | Next.js Concepts",
  description: "Learn about Next.js built-in image and font optimization",
};

export default function ImageFontsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild className="mr-4">
          <Link href="/next-concepts" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Concepts
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Image & Font Optimization</h1>
      </div>

      <Tabs defaultValue="fonts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fonts">Font Optimization</TabsTrigger>
          <TabsTrigger value="images">Image Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="fonts" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Next.js Font System</CardTitle>
              <CardDescription>
                Built-in automatic font optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Next.js includes a built-in font system that automatically
                optimizes your fonts, including custom font loading, reduced
                layout shift, and improved performance.
              </p>

              <h3 className="text-lg font-medium mt-4 mb-2">Key Benefits</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Zero Layout Shift</strong>: Automatically eliminates
                  Cumulative Layout Shift (CLS)
                </li>
                <li>
                  <strong>Self-Hosting</strong>: Fonts are downloaded at build
                  time and self-hosted with your deployment
                </li>
                <li>
                  <strong>Privacy</strong>: No requests sent to Google from the
                  browser
                </li>
                <li>
                  <strong>Performance</strong>: Optimized font loading and CSS
                  size
                </li>
                <li>
                  <strong>Type Safety</strong>: Provides type safety when using
                  the font throughout your application
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Using Google Fonts</CardTitle>
              <CardDescription>
                How to use Google Fonts with next/font
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Basic Usage</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/layout.tsx
import { Inter } from 'next/font/google'

// Initialize the font object
const inter = Inter({
  subsets: ['latin'],
  // Optional: Specify weight
  // weight: ['400', '700'],
  // Optional: Specify style
  // style: ['normal', 'italic'],
  // Optional: Specify display
  // display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Using Variable Fonts</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/layout.tsx
import { Roboto_Flex } from 'next/font/google'

// Initialize the variable font
const roboto = Roboto_Flex({
  subsets: ['latin'],
  // Variable fonts can have custom axes
  variable: '--font-roboto-flex',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <div className="font-sans">{children}</div>
      </body>
    </html>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Multiple Fonts</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google'

// Primary font for body text
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Monospace font for code blocks
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={\`\${inter.variable} \${robotoMono.variable}\`}>
      <body>
        <div className="font-sans">{children}</div>
        <code className="font-mono">console.log('Hello, world!');</code>
      </body>
    </html>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Tailwind CSS Configuration</h4>
                <CodeBlock
                  language="js"
                  code={`// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [],
}`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Using Local Fonts</CardTitle>
              <CardDescription>How to use your own font files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Basic Local Font Usage</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/fonts.ts
import localFont from 'next/font/local'

// Define the font
export const myFont = localFont({
  src: [
    {
      path: '../public/fonts/my-font.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/my-font-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-my-font',
})

// app/layout.tsx
import { myFont } from './fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Using Local Variable Fonts</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/fonts.ts
import localFont from 'next/font/local'

// Define the variable font
export const myVariableFont = localFont({
  src: '../public/fonts/my-variable-font.woff2',
  display: 'swap',
  variable: '--font-my-variable-font',
})

// app/layout.tsx
import { myVariableFont } from './fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myVariableFont.variable}>
      <body>
        <div className="font-sans">{children}</div>
      </body>
    </html>
  )
}`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Font Techniques</CardTitle>
              <CardDescription>
                More sophisticated font usage patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Preloading Specific Pages</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/special-page/fonts.ts
import { Montserrat } from 'next/font/google'

// This font will only be loaded for this specific page
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
})

// app/special-page/page.tsx
import { montserrat } from './fonts'

export default function SpecialPage() {
  return (
    <div className={montserrat.className}>
      <h1>Special Page with Montserrat Font</h1>
      <p>This page uses a different font than the rest of the site.</p>
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">
                  Adjusting Font Loading Behavior
                </h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/fonts.ts
import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  // Options for font loading behavior:
  
  // 'auto' - Default, preloads font for best performance
  // 'swap' - Displays text in fallback font until custom font loads (prevents invisible text)
  // 'block' - Briefly hides text until font loads (short FOIT)
  // 'fallback' - Similar to swap but can prevent layout shift
  // 'optional' - Like fallback but browser can decide not to load font if connection is slow
  display: 'swap',
  
  // Preload is true by default
  preload: true,
  
  // Adjust fallback behavior
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  
  // Adjust font features (OpenType features)
  // features: { 'ss01': true, 'ss02': true, 'cv01': false },
  
  // Adjust CSS variable name
  variable: '--font-inter',
})`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Font Loading Strategies</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Comparison of different font loading strategies and their
                  impact on performance metrics.
                </p>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Strategy</th>
                      <th className="text-left py-2">CLS</th>
                      <th className="text-left py-2">FOIT</th>
                      <th className="text-left py-2">FOUT</th>
                      <th className="text-left py-2">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">auto</td>
                      <td className="py-2">None</td>
                      <td className="py-2">Minimal</td>
                      <td className="py-2">Minimal</td>
                      <td className="py-2">Most cases</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">swap</td>
                      <td className="py-2">Possible</td>
                      <td className="py-2">None</td>
                      <td className="py-2">Yes</td>
                      <td className="py-2">Content-first sites</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">block</td>
                      <td className="py-2">None</td>
                      <td className="py-2">Short</td>
                      <td className="py-2">None</td>
                      <td className="py-2">Brand-critical sites</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">fallback</td>
                      <td className="py-2">Minimal</td>
                      <td className="py-2">Very short</td>
                      <td className="py-2">Short</td>
                      <td className="py-2">Balance of performance</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">optional</td>
                      <td className="py-2">Minimal</td>
                      <td className="py-2">Very short</td>
                      <td className="py-2">Maybe</td>
                      <td className="py-2">Performance-critical</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground mt-2">
                  CLS = Cumulative Layout Shift, FOIT = Flash of Invisible Text,
                  FOUT = Flash of Unstyled Text
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Demo</CardTitle>
              <CardDescription>Font optimization in action</CardDescription>
            </CardHeader>
            <CardContent>
              <FontDemo />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Next.js Image Component</CardTitle>
              <CardDescription>
                Built-in automatic image optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Next.js provides an Image component that extends the HTML{" "}
                <code>&lt;img&gt;</code> element with automatic image
                optimization features.
              </p>

              <h3 className="text-lg font-medium mt-4 mb-2">Key Benefits</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Size Optimization</strong>: Automatically serves
                  correctly sized images for each device
                </li>
                <li>
                  <strong>Visual Stability</strong>: Prevents layout shift
                  automatically
                </li>
                <li>
                  <strong>Faster Page Loads</strong>: Images are only loaded
                  when they enter the viewport
                </li>
                <li>
                  <strong>Asset Flexibility</strong>: On-demand image resizing,
                  even for images stored on remote servers
                </li>
                <li>
                  <strong>Modern Formats</strong>: Serves images in modern
                  formats like WebP and AVIF when supported
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Basic Image Usage</CardTitle>
              <CardDescription>
                How to use the Next.js Image component
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Local Images</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/page.tsx
import Image from 'next/image'
import profilePic from '../public/profile.jpg'

export default function Page() {
  return (
    <div>
      <h1>My Profile</h1>
      
      {/* Using imported image */}
      <Image
        src={profilePic || "/placeholder.svg"}
        alt="Profile picture"
        // width and height are automatically provided
        // placeholder="blur" is automatically enabled
        className="rounded-full"
      />
      
      {/* Or using a relative path to the public directory */}
      <Image
        src="/banner.jpg"
        alt="Banner image"
        width={1200}
        height={600}
        priority // Load this image immediately (good for LCP images)
      />
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Remote Images</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/page.tsx
import Image from 'next/image'

export default function Page() {
  return (
    <div>
      <h1>Remote Images</h1>
      
      {/* Remote image (requires width and height) */}
      <Image
        src="https://example.com/profile.jpg"
        alt="Remote profile picture"
        width={400}
        height={400}
      />
      
      {/* Remote image with fill */}
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image
          src="https://example.com/banner.jpg"
          alt="Remote banner"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Image Configuration</h4>
                <CodeBlock
                  language="js"
                  code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Configure remote domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: '**.example.org',
      },
    ],
    // Legacy format (still supported)
    // domains: ['example.com'],
    
    // Configure image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Disable image optimization for specific paths
    // dangerouslyAllowSVG: true,
    // contentDispositionType: 'attachment',
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Use a custom image loader
    // loader: 'custom',
    // loaderFile: './my-loader.js',
  },
}`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Image Techniques</CardTitle>
              <CardDescription>
                More sophisticated image usage patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Responsive Images</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/page.tsx
import Image from 'next/image'

export default function Page() {
  return (
    <div>
      <h1>Responsive Images</h1>
      
      {/* Responsive image that fills its container */}
      <div className="relative w-full h-[50vh]">
        <Image
          src="/hero.jpg"
          alt="Hero image"
          fill
          sizes="100vw" // This image will take 100% of the viewport width
          priority // Load this image immediately (good for LCP images)
          className="object-cover"
        />
      </div>
      
      {/* Responsive image with different sizes based on viewport */}
      <Image
        src="/content-image.jpg"
        alt="Content image"
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full h-auto"
      />
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Image Placeholders</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/page.tsx
import Image from 'next/image'
import profilePic from '../public/profile.jpg'

export default function Page() {
  return (
    <div>
      <h1>Image Placeholders</h1>
      
      {/* Blur placeholder from imported image */}
      <Image
        src={profilePic || "/placeholder.svg"}
        alt="Profile with blur"
        placeholder="blur" // Uses the imported image to generate a blur placeholder
      />
      
      {/* Custom blur data URL */}
      <Image
        src="/product.jpg"
        alt="Product image"
        width={500}
        height={500}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      
      {/* Empty placeholder */}
      <Image
        src="/banner.jpg"
        alt="Banner image"
        width={1200}
        height={400}
        placeholder="empty" // No placeholder (default)
      />
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Image Loading Strategies</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/page.tsx
import Image from 'next/image'

export default function Page() {
  return (
    <div>
      <h1>Image Loading Strategies</h1>
      
      {/* Priority loading for LCP (Largest Contentful Paint) images */}
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        priority // Preloads the image (no lazy loading)
      />
      
      {/* Eager loading for above-the-fold images */}
      <Image
        src="/logo.png"
        alt="Logo"
        width={200}
        height={100}
        loading="eager" // Similar to priority but without preload
      />
      
      {/* Lazy loading for below-the-fold images (default) */}
      <Image
        src="/content1.jpg"
        alt="Content image 1"
        width={800}
        height={600}
        loading="lazy" // Only loads when approaching the viewport
      />
      
      {/* Control quality */}
      <Image
        src="/photo.jpg"
        alt="High quality photo"
        width={1000}
        height={800}
        quality={90} // Higher quality (default is 75)
      />
    </div>
  )
}`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

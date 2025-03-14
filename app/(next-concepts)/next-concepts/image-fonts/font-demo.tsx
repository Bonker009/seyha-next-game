"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This is a client component that demonstrates different font styles
export function FontDemo() {
  const [fontSize, setFontSize] = useState(16);

  const fontFamilies = [
    { name: "System UI", style: "font-sans" },
    { name: "Serif", style: "font-serif" },
    { name: "Monospace", style: "font-mono" },
    { name: "Arial", style: "font-[Arial]" },
    { name: "Georgia", style: "font-[Georgia]" },
    { name: "Verdana", style: "font-[Verdana]" },
    { name: "Courier New", style: "font-[Courier_New]" },
  ];

  const sampleText = "The quick brown fox jumps over the lazy dog. 0123456789";

  return (
    <div className="space-y-4">
      <Tabs defaultValue="preview">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Font Preview</TabsTrigger>
          <TabsTrigger value="comparison">Font Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">Font Size: {fontSize}px</h3>
              <p className="text-sm text-muted-foreground">
                Adjust the font size to see how it affects rendering
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                disabled={fontSize <= 12}
              >
                Smaller
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFontSize(Math.min(32, fontSize + 2))}
                disabled={fontSize >= 32}
              >
                Larger
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFontSize(16)}
              >
                Reset
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-6">
                {fontFamilies.map((font) => (
                  <div key={font.name} className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      {font.name}
                    </h4>
                    <p
                      className={`${font.style}`}
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {sampleText}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              In a real Next.js application, you would use the{" "}
              <code>next/font</code> module to load and optimize these fonts.
              The demo above uses system fonts for illustration.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Font Loading Comparison</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">
                    Traditional Font Loading
                  </h4>
                  <div className="p-4 border rounded-md bg-muted/30">
                    <pre className="text-xs overflow-x-auto">
                      {`/* CSS */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

/* HTML */
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">

/* Problems */
- External network requests
- Render blocking
- Layout shifts (CLS)
- No self-hosting
- Privacy concerns`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Next.js Font Loading</h4>
                  <div className="p-4 border rounded-md bg-muted/30">
                    <pre className="text-xs overflow-x-auto">
                      {`// app/layout.tsx
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}

/* Benefits */
- Zero layout shift
- Self-hosted fonts
- No external requests
- Optimized loading
- Type safety`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="text-sm font-medium">Performance Comparison</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <h5 className="font-medium text-red-500 mb-2">
                      Traditional Loading
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• Blocks rendering</li>
                      <li>• Multiple network requests</li>
                      <li>• Layout shifts during load</li>
                      <li>• Inconsistent appearance</li>
                      <li>• Slower page loads</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h5 className="font-medium text-green-500 mb-2">
                      Next.js Font System
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• Non-blocking rendering</li>
                      <li>• Zero network requests</li>
                      <li>• No layout shifts</li>
                      <li>• Consistent appearance</li>
                      <li>• Faster page loads</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

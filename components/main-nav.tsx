"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, Palette, Home } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { AuroraText } from "./magicui/aurora-text";

export function MainNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
   
    {
      href: "/ui-libraries",
      label: "UI Libraries",
      active: pathname === "/ui-libraries",
      icon: <Palette className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="flex gap-6 md:gap-10 w-full">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold inline-block text-xl">
          <AuroraText>Next.js</AuroraText> Learning Hub
        </span>
      </Link>
      <nav className="flex items-center space-x-2 ml-auto">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={route.active ? "default" : "ghost"}
            asChild
          >
            <Link href={route.href} className="flex items-center">
              {route.icon}
              {route.label}
            </Link>
          </Button>
        ))}
        <ModeToggle />
      </nav>
    </div>
  );
}

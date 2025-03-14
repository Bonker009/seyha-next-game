"use client"

import { useState } from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"

// Counter Store
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementBy: (value: number) => void
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (value) => set((state) => ({ count: state.count + value })),
}))

// Theme Store with Persistence
interface ThemeState {
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    },
  ),
)

// Cart Store
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id)

      if (existingItem) {
        return {
          items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
        }
      }

      return { items: [...state.items, { ...item, quantity: 1 }] }
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),
  clearCart: () => set({ items: [] }),
  get totalItems() {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },
  get totalPrice() {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
}))

// Demo Products
const products = [
  { id: 1, name: "Product A", price: 19.99 },
  { id: 2, name: "Product B", price: 29.99 },
  { id: 3, name: "Product C", price: 39.99 },
]

export function ZustandDemo() {
  return (
    <Tabs defaultValue="counter">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="counter">Counter</TabsTrigger>
        <TabsTrigger value="theme">Theme</TabsTrigger>
        <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
      </TabsList>

      <TabsContent value="counter" className="mt-4">
        <CounterDemo />
      </TabsContent>

      <TabsContent value="theme" className="mt-4">
        <ThemeDemo />
      </TabsContent>

      <TabsContent value="cart" className="mt-4">
        <CartDemo />
      </TabsContent>
    </Tabs>
  )
}

function CounterDemo() {
  const count = useCounterStore((state) => state.count)
  const { increment, decrement, reset, incrementBy } = useCounterStore()
  const [incrementValue, setIncrementValue] = useState(5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Counter Example</CardTitle>
        <CardDescription>A simple counter using Zustand state management</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-7xl font-bold mb-8">{count}</div>
        <div className="flex gap-2 mb-4">
          <Button onClick={decrement} variant="outline" size="icon">
            <Minus className="h-4 w-4" />
          </Button>
          <Button onClick={increment} variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={reset} variant="outline" className="mb-4">
          Reset
        </Button>

        <div className="flex items-center gap-2 mt-4">
          <Input
            type="number"
            value={incrementValue}
            onChange={(e) => setIncrementValue(Number.parseInt(e.target.value) || 0)}
            className="w-20"
          />
          <Button onClick={() => incrementBy(incrementValue)}>Add {incrementValue}</Button>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>This counter state persists across component re-renders but not page refreshes.</p>
      </CardFooter>
    </Card>
  )
}

function ThemeDemo() {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Switcher</CardTitle>
        <CardDescription>A theme switcher with persistent state using Zustand</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div
            className={`p-8 rounded-lg mb-6 w-full text-center ${
              theme === "dark"
                ? "bg-slate-800 text-white"
                : theme === "light"
                  ? "bg-slate-100 text-black"
                  : "bg-gradient-to-r from-slate-100 to-slate-800 text-black"
            }`}
          >
            <p className="text-xl font-medium">Current Theme: {theme}</p>
            <p className="text-sm mt-2">This box shows the selected theme</p>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full">
            <Button
              onClick={() => setTheme("light")}
              variant={theme === "light" ? "default" : "outline"}
              className="w-full"
            >
              Light
            </Button>
            <Button
              onClick={() => setTheme("dark")}
              variant={theme === "dark" ? "default" : "outline"}
              className="w-full"
            >
              Dark
            </Button>
            <Button
              onClick={() => setTheme("system")}
              variant={theme === "system" ? "default" : "outline"}
              className="w-full"
            >
              System
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>This theme preference persists across page refreshes using localStorage.</p>
      </CardFooter>
    </Card>
  )
}

function CartDemo() {
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCartStore()

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Shopping Cart</CardTitle>
            <CardDescription>A shopping cart implementation using Zustand</CardDescription>
          </div>
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Products</h3>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button onClick={() => addItem(product)} className="w-full" size="sm">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Cart Items</h3>
            {items.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearCart}>
                Clear Cart
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">Your cart is empty</p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t mt-4">
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


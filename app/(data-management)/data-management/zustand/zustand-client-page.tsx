"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { ZustandDemo } from "./zustand-demo";

export default function ZustandClientPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild className="mr-4">
          <Link href="/data-management" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Data Management
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Zustand State Management</h1>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="basic">Basic Usage</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>What is Zustand?</CardTitle>
              <CardDescription>
                A small, fast, and scalable state management solution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Zustand (German for "state") is a small, fast, and scalable
                state management solution for React. It has a simple API based
                on hooks and doesn't require complex configurations or
                boilerplate code.
              </p>

              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Simple and Minimal API</strong>: Easy to learn and use
                </li>
                <li>
                  <strong>Small Package Size</strong>: ~1KB (minified and
                  gzipped)
                </li>
                <li>
                  <strong>No Boilerplate Code</strong>: No actions, reducers, or
                  dispatchers required
                </li>
                <li>
                  <strong>Middleware Support</strong>: Includes persist,
                  devtools, and more
                </li>
                <li>
                  <strong>TypeScript Support</strong>: Fully typed API
                </li>
                <li>
                  <strong>React Suspense Compatible</strong>: Works with React's
                  Suspense feature
                </li>
                <li>
                  <strong>Context-Free</strong>: No Context Provider needed
                </li>
              </ul>

              <h3 className="text-lg font-medium mt-6 mb-2">
                Getting Started with Zustand
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">1. Install Zustand</h4>
                  <CodeBlock language="bash" code={`npm install zustand`} />
                </div>

                <div>
                  <h4 className="font-medium mb-1">2. Create a Store</h4>
                  <CodeBlock
                    language="typescript"
                    code={`import { create } from 'zustand'

// Define your store
interface BearState {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
}

// Create your store
const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">
                    3. Use the Store in Components
                  </h4>
                  <CodeBlock
                    language="tsx"
                    code={`import { useBearStore } from './store'

function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} bears around here...</h1>
}

function Controls() {
  const { increasePopulation, removeAllBears } = useBearStore()
  
  return (
    <div>
      <button onClick={increasePopulation}>Add Bear</button>
      <button onClick={removeAllBears}>Remove All</button>
    </div>
  )
}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Zustand vs. Other State Management Solutions
              </CardTitle>
              <CardDescription>
                How Zustand compares to Redux, Context API, and others
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Zustand vs. Redux</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>
                      <strong>Simplicity</strong>: Zustand has a much simpler
                      API with less boilerplate
                    </li>
                    <li>
                      <strong>Size</strong>: Zustand is significantly smaller
                      (~1KB vs ~4KB)
                    </li>
                    <li>
                      <strong>Learning Curve</strong>: Zustand is easier to
                      learn and use
                    </li>
                    <li>
                      <strong>Middleware</strong>: Both support middleware, but
                      Redux has a larger ecosystem
                    </li>
                    <li>
                      <strong>DevTools</strong>: Both support Redux DevTools
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-1">
                    Zustand vs. React Context
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>
                      <strong>Performance</strong>: Zustand is more performant
                      as it avoids unnecessary re-renders
                    </li>
                    <li>
                      <strong>Setup</strong>: Zustand doesn't require Context
                      Providers
                    </li>
                    <li>
                      <strong>Complexity</strong>: Zustand handles complex state
                      more elegantly
                    </li>
                    <li>
                      <strong>Middleware</strong>: Zustand supports middleware,
                      Context doesn't
                    </li>
                    <li>
                      <strong>Persistence</strong>: Zustand has built-in
                      persistence support
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Zustand vs. Jotai/Recoil</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>
                      <strong>Approach</strong>: Zustand is store-based,
                      Jotai/Recoil are atom-based
                    </li>
                    <li>
                      <strong>Use Case</strong>: Jotai/Recoil excel at
                      fine-grained state, Zustand at global state
                    </li>
                    <li>
                      <strong>Simplicity</strong>: Zustand has a simpler API for
                      global state
                    </li>
                    <li>
                      <strong>Integration</strong>: All work well with React
                      Suspense
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Creating Stores</CardTitle>
              <CardDescription>
                Different ways to create and structure Zustand stores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Basic Store</h4>
                <CodeBlock
                  language="typescript"
                  code={`import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Store with Multiple Slices</h4>
                <CodeBlock
                  language="typescript"
                  code={`import { create } from 'zustand'

interface UserState {
  user: { id: number; name: string } | null
  setUser: (user: { id: number; name: string } | null) => void
}

interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

// Combined state type
type AppState = UserState & ThemeState

export const useAppStore = create<AppState>((set) => ({
  // User slice
  user: null,
  setUser: (user) => set({ user }),
  
  // Theme slice
  theme: 'light',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}))`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Organizing with Slices</h4>
                <CodeBlock
                  language="typescript"
                  code={`import { create, StateCreator } from 'zustand'

// Define slice types
interface UserSlice {
  user: { id: number; name: string } | null
  setUser: (user: { id: number; name: string } | null) => void
}

interface ThemeSlice {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

// Create slices
const createUserSlice: StateCreator<UserSlice & ThemeSlice, [], [], UserSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
})

const createThemeSlice: StateCreator<UserSlice & ThemeSlice, [], [], ThemeSlice> = (set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
})

// Combine slices into a store
export const useStore = create<UserSlice & ThemeSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createThemeSlice(...a),
}))`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Using Stores in Components</CardTitle>
              <CardDescription>
                How to consume Zustand stores in React components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Basic Usage</h4>
                <CodeBlock
                  language="tsx"
                  code={`import { useCounterStore } from './store'

function Counter() {
  const count = useCounterStore((state) => state.count)
  const { increment, decrement, reset } = useCounterStore()
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">
                  Optimized Usage (Preventing Unnecessary Re-renders)
                </h4>
                <CodeBlock
                  language="tsx"
                  code={`import { useCounterStore } from './store'

// This component only re-renders when count changes
function CountDisplay() {
  const count = useCounterStore((state) => state.count)
  return <h1>Count: {count}</h1>
}

// This component only re-renders when the component itself changes
function CountControls() {
  const { increment, decrement, reset } = useCounterStore()
  
  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// Parent component doesn't re-render when state changes
function Counter() {
  return (
    <div>
      <CountDisplay />
      <CountControls />
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Using Multiple Stores</h4>
                <CodeBlock
                  language="tsx"
                  code={`import { useUserStore } from './userStore'
import { useThemeStore } from './themeStore'

function UserProfile() {
  const user = useUserStore((state) => state.user)
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  
  return (
    <div className={theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>ID: {user.id}</p>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Demo</CardTitle>
              <CardDescription>
                Interact with a Zustand-powered counter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ZustandDemo />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Middleware</CardTitle>
              <CardDescription>
                Enhancing Zustand stores with middleware
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Zustand supports middleware that can extend the functionality of
                your stores. Here are some common middleware examples:
              </p>

              <div>
                <h4 className="font-medium mb-1">Persist Middleware</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Persists your store in localStorage, sessionStorage, or any
                  other storage solution.
                </p>
                <CodeBlock
                  language="typescript"
                  code={`import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SettingsState {
  darkMode: boolean
  toggleDarkMode: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'settings-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">DevTools Middleware</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Connects your store to the Redux DevTools Extension for
                  debugging.
                </p>
                <CodeBlock
                  language="typescript"
                  code={`import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CounterState {
  count: number
  increment: () => void
}

export const useCounterStore = create<CounterState>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: 'Counter Store', // optional name for the Redux DevTools
    }
  )
)`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Immer Middleware</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Allows you to write "mutating" code that is translated to
                  immutable updates.
                </p>
                <CodeBlock
                  language="typescript"
                  code={`import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface TodoState {
  todos: { id: number; text: string; done: boolean }[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
}

export const useTodoStore = create<TodoState>()(
  immer((set) => ({
    todos: [],
    addTodo: (text) => set((state) => {
      // With immer, you can "mutate" the state directly
      state.todos.push({ 
        id: Date.now(), 
        text, 
        done: false 
      })
    }),
    toggleTodo: (id) => set((state) => {
      const todo = state.todos.find(todo => todo.id === id)
      if (todo) {
        todo.done = !todo.done
      }
    }),
  }))
)`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">
                  Combining Multiple Middleware
                </h4>
                <CodeBlock
                  language="typescript"
                  code={`import { create } from 'zustand'
import { persist, devtools, immer } from 'zustand/middleware'

interface TodoState {
  todos: { id: number; text: string; done: boolean }[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
}

// Combine multiple middleware
export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      immer((set) => ({
        todos: [],
        addTodo: (text) => set((state) => {
          state.todos.push({ id: Date.now(), text, done: false })
        }),
        toggleTodo: (id) => set((state) => {
          const todo = state.todos.find(todo => todo.id === id)
          if (todo) {
            todo.done = !todo.done
          }
        }),
      })),
      {
        name: 'todo-storage',
      }
    ),
    {
      name: 'Todo Store',
    }
  )
)`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Patterns</CardTitle>
              <CardDescription>
                More sophisticated usage patterns for Zustand
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Async Actions</h4>
                <CodeBlock
                  language="typescript"
                  code={`import { create } from 'zustand'

interface UserState {
  user: { id: number; name: string } | null
  loading: boolean
  error: string | null
  fetchUser: (id: number) => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,
  fetchUser: async (id) => {
    try {
      set({ loading: true, error: null })
      
      // Simulate API call
      const response = await fetch(\`https://api.example.com/users/\${id}\`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      
      const user = await response.json()
      set({ user, loading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        loading: false 
      })
    }
  },
}))`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Computed Values</h4>
                <CodeBlock
                  language="typescript"
                  code={`import { create } from 'zustand'

interface TodoState {
  todos: { id: number; text: string; done: boolean }[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  
  // Computed values are derived from the state
  totalTodos: number
  completedTodos: number
  activeTodos: number
  completionPercentage: number
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  addTodo: (text) => set((state) => ({ 
    todos: [...state.todos, { id: Date.now(), text, done: false }] 
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  })),
  
  // Computed values using getters
  get totalTodos() {
    return get().todos.length
  },
  get completedTodos() {
    return get().todos.filter(todo => todo.done).length
  },
  get activeTodos() {
    return get().todos.filter(todo => !todo.done).length
  },
  get completionPercentage() {
    const total = get().totalTodos
    return total === 0 ? 0 : (get().completedTodos / total) * 100
  }
}))`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Selective Updates</h4>
                <CodeBlock
                  language="typescript"
                  code={`import { create } from 'zustand'

interface UserState {
  firstName: string
  lastName: string
  email: string
  updateUser: (fields: Partial<Pick<UserState, 'firstName' | 'lastName' | 'email'>>) => void
}

export const useUserStore = create<UserState>((set) => ({
  firstName: '',
  lastName: '',
  email: '',
  updateUser: (fields) => set((state) => ({ ...state, ...fields })),
}))`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">
                  Subscribing to Store Changes
                </h4>
                <CodeBlock
                  language="typescript"
                  code={`import { useEffect } from 'react'
import { useCounterStore } from './store'

function CounterLogger() {
  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = useCounterStore.subscribe(
      (state) => state.count,
      (count, previousCount) => {
        console.log('Count changed from', previousCount, 'to', count)
      }
    )
    
    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])
  
  return null
}`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Real-World Examples</CardTitle>
              <CardDescription>
                Practical examples of Zustand in action
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Shopping Cart Store</h4>
                <CodeBlock
                  language="typescript"
                  code={`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  
  // Computed values
  totalItems: number
  totalPrice: number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id)
        
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }
        }
        
        return { items: [...state.items, { ...item, quantity: 1 }] }
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      })),
      
      clearCart: () => set({ items: [] }),
      
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      get totalPrice() {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
)`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Authentication Store</h4>
                <CodeBlock
                  language="typescript"
                  code={`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null })
          
          // Simulate API call
          const response = await fetch('https://api.example.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          
          if (!response.ok) {
            throw new Error('Invalid credentials')
          }
          
          const data = await response.json()
          
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          })
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },
      
      signup: async (name, email, password) => {
        try {
          set({ isLoading: true, error: null })
          
          // Simulate API call
          const response = await fetch('https://api.example.com/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          })
          
          if (!response.ok) {
            throw new Error('Signup failed')
          }
          
          const data = await response.json()
          
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Signup failed',
            isLoading: false,
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
)`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

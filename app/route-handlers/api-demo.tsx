"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

type User = {
  id: number;
  name: string;
};

export function ApiDemo() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newUserName, setNewUserName] = useState("");
  const [addingUser, setAddingUser] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  async function fetchUsers() {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be a real API endpoint
      // For demo purposes, we'll simulate an API response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUsers([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Bob Johnson" },
      ]);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    setAddingUser(true);
    setAddError(null);

    try {
      if (!newUserName.trim()) {
        throw new Error("Name is required");
      }

      // In a real app, this would be a real API endpoint
      // For demo purposes, we'll simulate an API response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        id: Date.now(),
        name: newUserName,
      };

      setUsers([...users, newUser]);
      setNewUserName("");
    } catch (err: any) {
      setAddError(err.message || "Failed to add user");
    } finally {
      setAddingUser(false);
    }
  }

  return (
    <Tabs defaultValue="get">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="get">GET /api/users</TabsTrigger>
        <TabsTrigger value="post">POST /api/users</TabsTrigger>
      </TabsList>

      <TabsContent value="get" className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Users</h3>
          <Button onClick={fetchUsers} disabled={loading} size="sm">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Fetch Users
          </Button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="border rounded-md">
          {users.length === 0 ? (
            <p className="p-4 text-center text-muted-foreground">
              {loading
                ? "Loading users..."
                : "No users found. Click 'Fetch Users' to load."}
            </p>
          ) : (
            <ul className="divide-y">
              {users.map((user) => (
                <li key={user.id} className="p-4">
                  <div className="flex justify-between">
                    <span>{user.name}</span>
                    <span className="text-muted-foreground">ID: {user.id}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </TabsContent>

      <TabsContent value="post" className="space-y-4">
        <h3 className="text-lg font-medium">Add New User</h3>

        <form onSubmit={addUser} className="space-y-4">
          <div>
            <Input
              placeholder="User name"
              value={newUserName}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setNewUserName(e.target.value)}
            />
            {addError && (
              <p className="mt-1 text-sm text-red-500">{addError}</p>
            )}
          </div>

          <Button type="submit" disabled={addingUser}>
            {addingUser && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add User
          </Button>
        </form>

        {users.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Recently Added:</h4>
            <div className="border rounded-md">
              <ul className="divide-y">
                {users
                  .slice(-3)
                  .reverse()
                  .map((user) => (
                    <li key={user.id} className="p-4">
                      <div className="flex justify-between">
                        <span>{user.name}</span>
                        <span className="text-muted-foreground">
                          ID: {user.id}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

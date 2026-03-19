import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "PostgreSQL & Database",
  description: "Learn PostgreSQL — joins, schema design, queries, and advanced database concepts.",
}

export default function PostgreSQLPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild className="mr-4">
          <Link href="/data-management" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Data Management
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">PostgreSQL &amp; Database</h1>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schema">Tables &amp; Schema</TabsTrigger>
          <TabsTrigger value="joins">JOIN Tables</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Queries</TabsTrigger>
        </TabsList>

        {/* ─────────────────────────── OVERVIEW ─────────────────────────── */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>What is PostgreSQL?</CardTitle>
              <CardDescription>The world's most advanced open-source relational database</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                PostgreSQL (often called <strong>Postgres</strong>) is a powerful, open-source object-relational
                database system. It is known for its reliability, feature robustness, and compliance with SQL
                standards.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>ACID-compliant</strong> — guarantees reliable transactions</li>
                <li><strong>Extensible</strong> — custom types, functions, operators</li>
                <li><strong>Standards-compliant</strong> — closely follows the SQL standard</li>
                <li><strong>JSON support</strong> — first-class JSONB column type</li>
                <li><strong>Full-text search</strong> — built-in search capabilities</li>
                <li><strong>Advanced indexing</strong> — B-Tree, Hash, GIN, GiST, SP-GiST, BRIN</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Installing and connecting to PostgreSQL</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">1. Install PostgreSQL (Ubuntu/Debian)</h4>
                <CodeBlock
                  language="bash"
                  code={`sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">2. Connect via psql CLI</h4>
                <CodeBlock
                  language="bash"
                  code={`# Connect as the postgres superuser
sudo -u postgres psql

# Connect to a specific database
psql -U myuser -d mydb -h localhost -p 5432`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">3. Essential psql Commands</h4>
                <CodeBlock
                  language="sql"
                  code={`\\l           -- list all databases
\\c mydb      -- connect to a database
\\dt          -- list all tables in current schema
\\d tablename -- describe a table structure
\\du          -- list all roles/users
\\q           -- quit psql`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">4. Create a Database and User</h4>
                <CodeBlock
                  language="sql"
                  code={`-- Create a new database
CREATE DATABASE shop_db;

-- Create a user with a password
CREATE USER shop_user WITH PASSWORD 'secret123';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE shop_db TO shop_user;`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">5. Connect from Node.js (using pg library)</h4>
                <CodeBlock
                  language="typescript"
                  code={`import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'shop_db',
  user: 'shop_user',
  password: 'secret123',
})

// Run a query
const result = await pool.query('SELECT * FROM users WHERE id = $1', [1])
console.log(result.rows)`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PostgreSQL with Next.js</CardTitle>
              <CardDescription>Common patterns for using PostgreSQL in a Next.js app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                You can connect to PostgreSQL in Next.js using raw drivers like <code>pg</code>, or through ORMs
                like <strong>Prisma</strong> or <strong>Drizzle ORM</strong>. For production apps, always use a
                connection pool.
              </p>
              <CodeBlock
                language="typescript"
                code={`// lib/db.ts — singleton pool for Next.js
import { Pool } from 'pg'

const globalForPg = global as unknown as { pool: Pool }

export const pool =
  globalForPg.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,           // max pool size
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 2_000,
  })

if (process.env.NODE_ENV !== 'production') globalForPg.pool = pool`}
              />
              <CodeBlock
                language="typescript"
                code={`// app/api/users/route.ts — Server Route example
import { pool } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const { rows } = await pool.query(
    'SELECT id, name, email FROM users ORDER BY created_at DESC'
  )
  return NextResponse.json(rows)
}`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─────────────────────────── SCHEMA ─────────────────────────── */}
        <TabsContent value="schema" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Types</CardTitle>
              <CardDescription>The most commonly used PostgreSQL column types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Numeric</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li><code>SMALLINT</code> — 2-byte integer</li>
                    <li><code>INTEGER / INT</code> — 4-byte integer</li>
                    <li><code>BIGINT</code> — 8-byte integer</li>
                    <li><code>SERIAL</code> — auto-increment integer</li>
                    <li><code>BIGSERIAL</code> — auto-increment bigint</li>
                    <li><code>NUMERIC(p,s)</code> — exact decimal</li>
                    <li><code>REAL / FLOAT4</code> — 4-byte float</li>
                    <li><code>DOUBLE PRECISION</code> — 8-byte float</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Text &amp; Binary</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li><code>CHAR(n)</code> — fixed-length string</li>
                    <li><code>VARCHAR(n)</code> — variable-length string</li>
                    <li><code>TEXT</code> — unlimited string</li>
                    <li><code>BYTEA</code> — binary data</li>
                    <li><code>UUID</code> — universally unique identifier</li>
                  </ul>
                  <h4 className="font-medium mb-2 mt-4">Date &amp; Time</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li><code>DATE</code> — calendar date</li>
                    <li><code>TIME</code> — time of day</li>
                    <li><code>TIMESTAMP</code> — date + time</li>
                    <li><code>TIMESTAMPTZ</code> — date + time + timezone</li>
                    <li><code>INTERVAL</code> — time span</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Other Types</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li><code>BOOLEAN</code> — true / false</li>
                    <li><code>JSON / JSONB</code> — JSON data (JSONB is binary, faster)</li>
                    <li><code>ARRAY</code> — any type can be an array</li>
                    <li><code>ENUM</code> — enumerated list of values</li>
                    <li><code>INET / CIDR</code> — IP addresses</li>
                    <li><code>TSVECTOR</code> — full-text search</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Creating Tables</CardTitle>
              <CardDescription>DDL syntax with constraints and best practices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Basic Table Creation</h4>
                <CodeBlock
                  language="sql"
                  code={`CREATE TABLE users (
  id         BIGSERIAL    PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  name       VARCHAR(100) NOT NULL,
  age        INTEGER      CHECK (age >= 0 AND age <= 150),
  is_active  BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Table with Foreign Key</h4>
                <CodeBlock
                  language="sql"
                  code={`CREATE TABLE posts (
  id         BIGSERIAL    PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  content    TEXT,
  published  BOOLEAN      NOT NULL DEFAULT FALSE,
  user_id    BIGINT       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ON DELETE CASCADE  → delete posts when the user is deleted
-- ON DELETE SET NULL → set user_id to NULL when user is deleted
-- ON DELETE RESTRICT → prevent deleting a user who has posts`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Many-to-Many Join Table</h4>
                <CodeBlock
                  language="sql"
                  code={`CREATE TABLE tags (
  id   BIGSERIAL    PRIMARY KEY,
  name VARCHAR(50)  NOT NULL UNIQUE
);

-- Join table (no surrogate key needed)
CREATE TABLE post_tags (
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id  BIGINT NOT NULL REFERENCES tags(id)  ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Altering Tables</h4>
                <CodeBlock
                  language="sql"
                  code={`-- Add a column
ALTER TABLE users ADD COLUMN avatar_url TEXT;

-- Drop a column
ALTER TABLE users DROP COLUMN avatar_url;

-- Rename a column
ALTER TABLE users RENAME COLUMN name TO full_name;

-- Change column type
ALTER TABLE users ALTER COLUMN age TYPE SMALLINT;

-- Add a constraint
ALTER TABLE users ADD CONSTRAINT chk_age CHECK (age >= 0);`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Indexes</CardTitle>
              <CardDescription>Speed up reads at the cost of write overhead</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Indexes allow PostgreSQL to find rows without scanning the entire table. Always index columns
                used in <code>WHERE</code>, <code>JOIN</code>, and <code>ORDER BY</code> clauses.
              </p>
              <CodeBlock
                language="sql"
                code={`-- Single-column index
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Unique index (also enforces uniqueness)
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Composite index — order matters! (user_id, created_at)
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at DESC);

-- Partial index — only index published posts
CREATE INDEX idx_posts_published ON posts(created_at)
WHERE published = TRUE;

-- Drop an index
DROP INDEX idx_posts_user_id;

-- View index usage stats
SELECT * FROM pg_stat_user_indexes WHERE relname = 'posts';`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─────────────────────────── JOINS ─────────────────────────── */}
        <TabsContent value="joins" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Understanding JOIN Tables</CardTitle>
              <CardDescription>How PostgreSQL combines rows from two or more tables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                A <strong>JOIN</strong> merges rows from two tables based on a related column (usually a
                foreign key). The result is a virtual table you can query, filter, and aggregate.
              </p>
              <p className="text-sm text-muted-foreground">
                All examples below use these three tables: <code>users</code>, <code>orders</code>, and{" "}
                <code>products</code>.
              </p>
              <CodeBlock
                language="sql"
                code={`-- Sample data used in all JOIN examples

CREATE TABLE users (
  id   INT PRIMARY KEY,
  name TEXT
);
INSERT INTO users VALUES (1,'Alice'),(2,'Bob'),(3,'Carol'),(4,'Dave');

CREATE TABLE orders (
  id         INT PRIMARY KEY,
  user_id    INT REFERENCES users(id),
  product_id INT,
  amount     NUMERIC
);
INSERT INTO orders VALUES
  (101, 1, 10, 29.99),
  (102, 1, 11, 49.99),
  (103, 2, 10, 29.99),
  (104, 5, 12, 9.99);   -- user_id 5 does NOT exist in users

CREATE TABLE products (
  id    INT PRIMARY KEY,
  name  TEXT,
  price NUMERIC
);
INSERT INTO products VALUES
  (10,'Widget',29.99),(11,'Gadget',49.99),(13,'Donut',1.99);
  -- product_id 12 does NOT exist in products`}
              />
            </CardContent>
          </Card>

          {/* INNER JOIN */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle>INNER JOIN</CardTitle>
                <Badge variant="secondary">Most Common</Badge>
              </div>
              <CardDescription>Returns only rows that have a match in BOTH tables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 bg-muted/30 text-sm font-mono text-center space-y-1">
                <div>Table A ● ● ●<span className="text-primary font-bold">  ◉ ◉  </span>● ● ● Table B</div>
                <div className="text-xs text-muted-foreground">Only the overlapping rows are returned</div>
              </div>
              <p className="text-sm text-muted-foreground">
                If a row in either table has no matching row in the other, it is <strong>excluded</strong> from
                the result. This is the default JOIN type.
              </p>
              <CodeBlock
                language="sql"
                code={`-- Get all orders WITH their user information
SELECT
  o.id        AS order_id,
  u.name      AS customer,
  o.amount
FROM orders o
INNER JOIN users u ON u.id = o.user_id;

-- Result:
-- order_id | customer | amount
-- ---------+----------+-------
--      101 | Alice    | 29.99
--      102 | Alice    | 49.99
--      103 | Bob      | 29.99
-- (row 104 is excluded — user_id 5 doesn't exist in users)`}
              />
              <CodeBlock
                language="sql"
                code={`-- Three-table INNER JOIN: orders → users AND orders → products
SELECT
  u.name       AS customer,
  p.name       AS product,
  o.amount
FROM orders o
INNER JOIN users    u ON u.id = o.user_id
INNER JOIN products p ON p.id = o.product_id;

-- Result (only rows matched in ALL three tables):
-- customer | product | amount
-- ---------+---------+-------
-- Alice    | Widget  | 29.99
-- Alice    | Gadget  | 49.99
-- Bob      | Widget  | 29.99`}
              />
            </CardContent>
          </Card>

          {/* LEFT JOIN */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle>LEFT JOIN (LEFT OUTER JOIN)</CardTitle>
                <Badge variant="secondary">Second Most Common</Badge>
              </div>
              <CardDescription>Returns ALL rows from the left table, plus matched rows from the right</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 bg-muted/30 text-sm font-mono text-center space-y-1">
                <div>Table A <span className="text-primary font-bold">● ● ● ◉ ◉</span>  ● ● ● Table B</div>
                <div className="text-xs text-muted-foreground">All left rows are kept; unmatched right columns become NULL</div>
              </div>
              <p className="text-sm text-muted-foreground">
                If a left-table row has no match in the right table, the right-table columns are filled with{" "}
                <code>NULL</code>. Use this to find rows <em>with or without</em> a related record.
              </p>
              <CodeBlock
                language="sql"
                code={`-- Get ALL users, show their orders (NULL if they have none)
SELECT
  u.name      AS customer,
  o.id        AS order_id,
  o.amount
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;

-- Result:
-- customer | order_id | amount
-- ---------+----------+--------
-- Alice    |      101 |  29.99
-- Alice    |      102 |  49.99
-- Bob      |      103 |  29.99
-- Carol    |     NULL |   NULL   ← Carol has no orders
-- Dave     |     NULL |   NULL   ← Dave has no orders`}
              />
              <CodeBlock
                language="sql"
                code={`-- Trick: find users who have NO orders at all
SELECT u.name
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;

-- Result:
-- name
-- -----
-- Carol
-- Dave`}
              />
            </CardContent>
          </Card>

          {/* RIGHT JOIN */}
          <Card>
            <CardHeader>
              <CardTitle>RIGHT JOIN (RIGHT OUTER JOIN)</CardTitle>
              <CardDescription>Returns ALL rows from the right table, plus matched rows from the left</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 bg-muted/30 text-sm font-mono text-center space-y-1">
                <div>Table A ● ● ● <span className="text-primary font-bold">◉ ◉  ● ● ●</span> Table B</div>
                <div className="text-xs text-muted-foreground">All right rows are kept; unmatched left columns become NULL</div>
              </div>
              <p className="text-sm text-muted-foreground">
                A RIGHT JOIN is the mirror image of a LEFT JOIN. In practice, most developers rewrite a RIGHT
                JOIN as a LEFT JOIN by swapping the table order — the results are identical.
              </p>
              <CodeBlock
                language="sql"
                code={`-- Get ALL orders, show their product info (NULL if product is missing)
SELECT
  o.id        AS order_id,
  p.name      AS product,
  o.amount
FROM products p
RIGHT JOIN orders o ON o.product_id = p.id;

-- Equivalent LEFT JOIN (preferred style):
SELECT
  o.id        AS order_id,
  p.name      AS product,
  o.amount
FROM orders o
LEFT JOIN products p ON p.id = o.product_id;

-- Result:
-- order_id | product | amount
-- ---------+---------+--------
--      101 | Widget  |  29.99
--      102 | Gadget  |  49.99
--      103 | Widget  |  29.99
--      104 |  NULL   |   9.99  ← product_id 12 not in products`}
              />
            </CardContent>
          </Card>

          {/* FULL OUTER JOIN */}
          <Card>
            <CardHeader>
              <CardTitle>FULL OUTER JOIN</CardTitle>
              <CardDescription>Returns ALL rows from BOTH tables, matching where possible</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 bg-muted/30 text-sm font-mono text-center space-y-1">
                <div><span className="text-primary font-bold">● ● ● ◉ ◉  ● ● ●</span></div>
                <div className="text-xs text-muted-foreground">Every row from both sides is kept; unmatched sides are NULL</div>
              </div>
              <CodeBlock
                language="sql"
                code={`-- Show every user AND every order — match where possible
SELECT
  u.name      AS customer,
  o.id        AS order_id,
  o.amount
FROM users u
FULL OUTER JOIN orders o ON o.user_id = u.id;

-- Result:
-- customer | order_id | amount
-- ---------+----------+--------
-- Alice    |      101 |  29.99
-- Alice    |      102 |  49.99
-- Bob      |      103 |  29.99
-- Carol    |     NULL |   NULL  ← user with no orders
-- Dave     |     NULL |   NULL  ← user with no orders
-- NULL     |      104 |   9.99  ← order with no matching user`}
              />
            </CardContent>
          </Card>

          {/* CROSS JOIN */}
          <Card>
            <CardHeader>
              <CardTitle>CROSS JOIN</CardTitle>
              <CardDescription>Cartesian product — every row from Table A paired with every row from Table B</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A CROSS JOIN produces <em>m × n</em> rows (4 users × 3 products = 12 rows). Use it for
                generating combinations, test data, or calendar grids. There is no <code>ON</code> clause.
              </p>
              <CodeBlock
                language="sql"
                code={`-- Every possible user–product pairing
SELECT
  u.name    AS customer,
  p.name    AS product,
  p.price
FROM users u
CROSS JOIN products p;

-- Result (4 users × 3 products = 12 rows):
-- customer | product | price
-- ---------+---------+-------
-- Alice    | Widget  | 29.99
-- Alice    | Gadget  | 49.99
-- Alice    | Donut   |  1.99
-- Bob      | Widget  | 29.99
-- ...and so on for Carol and Dave`}
              />
            </CardContent>
          </Card>

          {/* SELF JOIN */}
          <Card>
            <CardHeader>
              <CardTitle>SELF JOIN</CardTitle>
              <CardDescription>Join a table to itself — useful for hierarchical or relational data in one table</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock
                language="sql"
                code={`-- Employees table where manager_id references the same table
CREATE TABLE employees (
  id         INT  PRIMARY KEY,
  name       TEXT NOT NULL,
  manager_id INT  REFERENCES employees(id)  -- self-reference
);

INSERT INTO employees VALUES
  (1, 'CEO',    NULL),
  (2, 'Alice',  1),
  (3, 'Bob',    1),
  (4, 'Carol',  2),
  (5, 'Dave',   2);

-- List each employee with their manager's name
SELECT
  e.name        AS employee,
  m.name        AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id;

-- Result:
-- employee | manager
-- ---------+--------
-- CEO      | NULL
-- Alice    | CEO
-- Bob      | CEO
-- Carol    | Alice
-- Dave     | Alice`}
              />
            </CardContent>
          </Card>

          {/* JOIN cheat-sheet */}
          <Card>
            <CardHeader>
              <CardTitle>JOIN Quick-Reference</CardTitle>
              <CardDescription>When to use each type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-medium">JOIN Type</th>
                      <th className="text-left py-2 pr-4 font-medium">Returns</th>
                      <th className="text-left py-2 font-medium">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 pr-4"><code>INNER JOIN</code></td>
                      <td className="py-2 pr-4">Matched rows only</td>
                      <td className="py-2">Fetching related data that must exist</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4"><code>LEFT JOIN</code></td>
                      <td className="py-2 pr-4">All left + matched right</td>
                      <td className="py-2">Optional relationships, finding missing data</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4"><code>RIGHT JOIN</code></td>
                      <td className="py-2 pr-4">All right + matched left</td>
                      <td className="py-2">Same as LEFT JOIN (swap table order instead)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4"><code>FULL OUTER JOIN</code></td>
                      <td className="py-2 pr-4">All rows from both sides</td>
                      <td className="py-2">Data reconciliation, finding orphans on both sides</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4"><code>CROSS JOIN</code></td>
                      <td className="py-2 pr-4">Cartesian product (m × n)</td>
                      <td className="py-2">Generating combinations, test data</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4"><code>SELF JOIN</code></td>
                      <td className="py-2 pr-4">Table joined to itself</td>
                      <td className="py-2">Hierarchies, adjacency lists</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─────────────────────────── ADVANCED ─────────────────────────── */}
        <TabsContent value="advanced" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Aggregate Functions &amp; GROUP BY</CardTitle>
              <CardDescription>Summarize data across groups of rows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock
                language="sql"
                code={`-- Built-in aggregate functions
SELECT
  COUNT(*)                  AS total_orders,
  COUNT(DISTINCT user_id)   AS unique_customers,
  SUM(amount)               AS total_revenue,
  AVG(amount)               AS avg_order_value,
  MIN(amount)               AS smallest_order,
  MAX(amount)               AS largest_order
FROM orders;

-- GROUP BY: revenue per user
SELECT
  u.name,
  COUNT(o.id)   AS order_count,
  SUM(o.amount) AS total_spent
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name
ORDER BY total_spent DESC NULLS LAST;

-- HAVING: only users who spent more than $50
SELECT
  u.name,
  SUM(o.amount) AS total_spent
FROM users u
INNER JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name
HAVING SUM(o.amount) > 50;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subqueries</CardTitle>
              <CardDescription>Nest a query inside another query</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Scalar Subquery (single value)</h4>
                <CodeBlock
                  language="sql"
                  code={`-- Find orders above the average order value
SELECT id, amount
FROM orders
WHERE amount > (SELECT AVG(amount) FROM orders);`}
                />
              </div>
              <div>
                <h4 className="font-medium mb-1">IN Subquery</h4>
                <CodeBlock
                  language="sql"
                  code={`-- Users who have placed at least one order
SELECT name FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders WHERE user_id IS NOT NULL);

-- Users who have NEVER placed an order
SELECT name FROM users
WHERE id NOT IN (
  SELECT user_id FROM orders WHERE user_id IS NOT NULL
);`}
                />
              </div>
              <div>
                <h4 className="font-medium mb-1">EXISTS Subquery (faster for large tables)</h4>
                <CodeBlock
                  language="sql"
                  code={`-- Same "has orders" check — EXISTS short-circuits on first match
SELECT name FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);`}
                />
              </div>
              <div>
                <h4 className="font-medium mb-1">Correlated Subquery</h4>
                <CodeBlock
                  language="sql"
                  code={`-- For each user, show their largest order amount
SELECT
  u.name,
  (SELECT MAX(o.amount)
   FROM orders o
   WHERE o.user_id = u.id) AS max_order
FROM users u;`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Table Expressions (CTEs)</CardTitle>
              <CardDescription>Named temporary result sets that improve readability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A CTE (introduced with <code>WITH</code>) is like a named subquery. It makes complex queries
                much easier to read and reason about. CTEs can also be recursive.
              </p>
              <div>
                <h4 className="font-medium mb-1">Basic CTE</h4>
                <CodeBlock
                  language="sql"
                  code={`WITH user_totals AS (
  SELECT
    user_id,
    COUNT(*)   AS order_count,
    SUM(amount) AS total_spent
  FROM orders
  GROUP BY user_id
)
SELECT
  u.name,
  ut.order_count,
  ut.total_spent
FROM users u
INNER JOIN user_totals ut ON ut.user_id = u.id
ORDER BY ut.total_spent DESC;`}
                />
              </div>
              <div>
                <h4 className="font-medium mb-1">Multiple CTEs</h4>
                <CodeBlock
                  language="sql"
                  code={`WITH
  top_customers AS (
    SELECT user_id, SUM(amount) AS total
    FROM orders
    GROUP BY user_id
    ORDER BY total DESC
    LIMIT 3
  ),
  customer_info AS (
    SELECT u.id, u.name, u.email
    FROM users u
    INNER JOIN top_customers tc ON tc.user_id = u.id
  )
SELECT ci.name, ci.email, tc.total
FROM customer_info ci
INNER JOIN top_customers tc ON tc.user_id = ci.id;`}
                />
              </div>
              <div>
                <h4 className="font-medium mb-1">Recursive CTE — Walk a Hierarchy</h4>
                <CodeBlock
                  language="sql"
                  code={`-- Walk the employees hierarchy from CEO down
WITH RECURSIVE org_chart AS (
  -- Anchor: start at the CEO (no manager)
  SELECT id, name, manager_id, 0 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive: join each employee to their manager
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  INNER JOIN org_chart oc ON oc.id = e.manager_id
)
SELECT
  REPEAT('  ', level) || name AS hierarchy,
  level
FROM org_chart
ORDER BY level, name;

-- Result:
-- hierarchy   | level
-- ------------+------
-- CEO         |     0
--   Alice     |     1
--   Bob       |     1
--     Carol   |     2
--     Dave    |     2`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Window Functions</CardTitle>
              <CardDescription>Perform calculations across a set of rows without collapsing them</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Unlike <code>GROUP BY</code>, window functions do <strong>not</strong> collapse rows. Each
                row keeps its identity while also gaining access to aggregate information from its "window."
              </p>
              <CodeBlock
                language="sql"
                code={`-- Syntax
function_name(...) OVER (
  PARTITION BY column   -- optional grouping
  ORDER BY column       -- optional ordering within the window
  ROWS/RANGE ...        -- optional frame specification
)

-- ── Ranking Functions ──────────────────────────────────────────
SELECT
  u.name,
  o.amount,
  ROW_NUMBER() OVER (PARTITION BY o.user_id ORDER BY o.amount DESC) AS row_num,
  RANK()       OVER (PARTITION BY o.user_id ORDER BY o.amount DESC) AS rank,
  DENSE_RANK() OVER (PARTITION BY o.user_id ORDER BY o.amount DESC) AS dense_rank
FROM orders o
INNER JOIN users u ON u.id = o.user_id;

-- ── Running Total ──────────────────────────────────────────────
SELECT
  id,
  amount,
  SUM(amount) OVER (ORDER BY id) AS running_total
FROM orders;

-- ── Percentage of Total ────────────────────────────────────────
SELECT
  id,
  amount,
  ROUND(amount / SUM(amount) OVER () * 100, 2) AS pct_of_total
FROM orders;

-- ── LAG / LEAD — access previous / next row ────────────────────
SELECT
  id,
  amount,
  LAG(amount,  1) OVER (ORDER BY id) AS prev_amount,
  LEAD(amount, 1) OVER (ORDER BY id) AS next_amount,
  amount - LAG(amount, 1) OVER (ORDER BY id) AS diff_from_prev
FROM orders;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transactions &amp; Isolation</CardTitle>
              <CardDescription>Ensure data consistency with ACID transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock
                language="sql"
                code={`-- Basic transaction
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- debit
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- credit
COMMIT;   -- both succeed → saved

-- Rollback on error
BEGIN;
  DELETE FROM orders WHERE user_id = 99;
ROLLBACK;  -- undo everything since BEGIN

-- SAVEPOINT — partial rollback
BEGIN;
  INSERT INTO logs VALUES ('step 1');
  SAVEPOINT sp1;
  INSERT INTO logs VALUES ('step 2');
  ROLLBACK TO sp1;  -- undo only step 2
  INSERT INTO logs VALUES ('step 2 retry');
COMMIT;`}
              />
              <div>
                <h4 className="font-medium mb-1">Isolation Levels</h4>
                <CodeBlock
                  language="sql"
                  code={`-- Set isolation level for a transaction
BEGIN ISOLATION LEVEL SERIALIZABLE;
  ...
COMMIT;

-- Levels (weakest → strongest):
-- READ UNCOMMITTED — can read dirty (uncommitted) data (rarely used in PG)
-- READ COMMITTED   — default in PostgreSQL; only reads committed data
-- REPEATABLE READ  — same query always returns same rows within a transaction
-- SERIALIZABLE     — transactions behave as if run one after another`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Useful Performance Tips</CardTitle>
              <CardDescription>EXPLAIN, VACUUM, and query optimisation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock
                language="sql"
                code={`-- EXPLAIN: see the query plan (no execution)
EXPLAIN SELECT * FROM orders WHERE user_id = 1;

-- EXPLAIN ANALYZE: execute and show actual timings
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 1;

-- VACUUM: reclaim dead rows (runs automatically in modern PG)
VACUUM orders;
VACUUM ANALYZE orders;  -- also updates statistics

-- Find slow queries (requires pg_stat_statements extension)
SELECT
  query,
  calls,
  total_exec_time / calls AS avg_ms,
  rows / calls            AS avg_rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;

-- Check table & index sizes
SELECT
  relname                               AS table,
  pg_size_pretty(pg_total_relation_size(oid)) AS total_size
FROM pg_class
WHERE relkind = 'r'
ORDER BY pg_total_relation_size(oid) DESC
LIMIT 10;`}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

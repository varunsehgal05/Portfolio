const fs = require('fs');
let content = fs.readFileSync('src/routes/__root.tsx', 'utf8');

// Add import
content = content.replace(
  'import { useEffect, type ReactNode } from "react";',
  'import { useEffect, useState, type ReactNode } from "react";\nimport { AsciiLoader } from "../components/AsciiLoader";'
);

// Add state to RootComponent
const oldRootComponent = `function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}`;

const newRootComponent = `function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading && <AsciiLoader onComplete={() => setIsLoading(false)} />}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}`;

content = content.replace(oldRootComponent, newRootComponent);
fs.writeFileSync('src/routes/__root.tsx', content, 'utf8');

# ClickUp API Client

<p>A TypeScript-based client for interacting with the <a href="https://clickup.com/api">ClickUp API</a>. This library provides an easy-to-use, type-safe interface for managing Workspaces (teams), Spaces, Folders, Lists, and Tasks in ClickUp.</p>

## Features

- Fetch Workspaces (teams), Spaces, Folders, Lists, and Tasks from ClickUp
- Retrieve detailed information about specific entities
- Supports TypeScript for strong typing and autocompletion
- Modular design with separate classes for each resource type
- Built with <code>axios</code> for reliable HTTP requests

## Installation

<p>Install the package via npm:</p>

```bash
npm install @hot-gmbh/clickup
```

## Usage

<p>This package implements the functionality documented in the <a href="https://clickup.com/api">ClickUp API documentation</a> and mirrors the routes available in their <a href="https://www.postman.com/clickup-api/clickup-public-api/collection/rekuqnj/clickup-api-v2-reference">Postman collection</a>.</p>

### Basic Example

```typescript
import { ClickUp } from "@hot-gmbh/clickup";

const apiKey = process.env.CLICKUP_API_KEY; // Replace with your ClickUp API key

const clickUp = new ClickUp(apiKey);

// Fetch all spaces for a team
const spaces = await clickUp.spaces.getAll("your_team_id");
console.log("Spaces:", spaces);
console.log("First space ID:", spaces[0].id);
```

### Advanced Example

```typescript
import { ClickUp } from "@hot-gmbh/clickup";

async function main() {
  const clickUp = new ClickUp(process.env.CLICKUP_API_KEY);

  // Get all teams (workspaces)
  const teams = await clickUp.teams.getAll();
  const teamId = teams[0].id;

  // Get spaces for a team, including archived ones
  const spaces = await clickUp.spaces.getAll(teamId, true);
  console.log("Spaces:", spaces);

  // Get folders for a space
  const spaceId = spaces[0].id;
  const folders = await clickUp.folders.getAll(spaceId);
  console.log("Folders:", folders);

  // Get lists for a folder
  const folderId = folders[0]?.id;
  if (folderId) {
    const lists = await clickUp.lists.getAll(folderId);
    console.log("Lists:", lists);
  }

  // Get folderless lists for a space
  const folderlessLists = await clickUp.lists.getFolderless(spaceId);
  console.log("Folderless Lists:", folderlessLists);
}

main().catch(console.error);
```

## API Documentation

### Initialization

```typescript

const clickUp = new ClickUp(apiKey: string, baseUrl?: string);

```

- `apiKey`: Your ClickUp personal API token (e.g., `pk__xxxx_...`)
- `baseUrl`: Optional base URL for the ClickUp API (defaults to `https://api.clickup.com/api/v2`)

### Methods

#### Teams (Workspaces)

Accessed via `clickUp.teams`

- <strong>`getAll(): Promise&lt;Team[]&gt;`</strong>

  - Fetches all teams (workspaces) accessible with the API key
  - Returns an array of `Team` objects

#### Spaces

Accessed via `clickUp.spaces`

- <strong>`getAll(teamId: string | number, includeArchived?: boolean): Promise&lt;Space[]&gt;`</strong>
  - Fetches all spaces for a given team.
  - `teamId`: The ID of the team/workspace.
  - `includeArchived`: Optional, includes archived spaces if `true` (default: `false`).
  - Returns an array of `Space` objects.

#### Folders

Accessed via `clickUp.folders`

- <strong>`getAll(spaceId: string | number): Promise&lt;Folder[]&gt;`</strong>
  - Fetches all folders within a space.
  - `spaceId`: The ID of the space.
  - Returns an array of `Folder` objects or an empty array if none exist.

#### Lists

Accessed via `clickUp.lists`

- `getAll(folderId: string | number): Promise&lt;List[]&gt;` - Fetches all lists within a folder. - `folderId`: The ID of the folder. - Returns an array of `List` objects.

- <strong>`getFolderless(spaceId: string | number): Promise&lt;List[]&gt;`</strong>
  - Fetches all lists directly under a space (not in a folder).
  - `spaceId`: The ID of the space.
  - Returns an array of `List` objects.

### Types

<p>The library includes TypeScript interfaces for all resources:</p>

- <strong>`Team`</strong>: `{ id: string, name: string, color: string, avatar: string | null, members: any[] }`</li>
- <strong>`Space`</strong>: `{ id: string, name: string, color: string, private: boolean, avatar: string | null, admin_can_manage: boolean, statuses: any[], multiple_assignees: boolean, features: any, archived: boolean, members: any[] }`</li>
- <strong>`Folder`</strong>: `{ id: string, name: string, hidden: boolean }`</li>
- <strong>`List`</strong>: `{ id: string, name: string, folder?: { id: string, name: string } }`</li>

## Development

### Setup

- Clone the repository:

```bash
git clone https://github.com/hot-gmbh/clickup.git
cd clickup
```

- Install dependencies:

```bash
npm install
```

- Build the project:

```bash
npm run build
```

### Project Structure

```bash
clickup/
├── src/
│ ├── clickup.ts # Main ClickUp class
│ ├── teams.ts # Teams (Workspaces) operations
│ ├── spaces.ts # Spaces operations
│ ├── folders.ts # Folders operations
│ ├── lists.ts # Lists operations
│ ├── types.ts # Shared TypeScript types
│ └── index.ts # Entry point exporting ClickUp
├── dist/ # Compiled JavaScript output
├── package.json
└── tsconfig.json
```

## Contributing

<p>We welcome contributions! Please follow these steps:</p>

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

### Guidelines

- Follow TypeScript best practices
- Add tests for new features (if a test suite is added)
- Update the README with new methods or changes.

## License

<p>This project is licensed under the MIT License. See the <a href="./LICENSE">LICENSE</a> file for details.</p>

## Issues

<p>If you encounter bugs or have feature requests, please <a href="https://github.com/hot-gmbh/clickup/issues">open an issue</a> on GitHub.</p>

## Acknowledgments

- Built with <a href="https://github.com/axios/axios">axios</a> for HTTP requests.
- Inspired by the <a href="https://clickup.com/api">ClickUp API documentation</a>.

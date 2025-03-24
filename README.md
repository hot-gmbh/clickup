<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ClickUp API Client</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1, h2, h3 { color: #333; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        code { font-family: Consolas, monospace; }
        a { color: #0366d6; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ul { margin: 10px 0; padding-left: 20px; }
        blockquote { border-left: 4px solid #ccc; padding-left: 10px; color: #666; }
    </style>
</head>
<body>
    <h1>ClickUp API Client</h1>
    <p>A TypeScript-based client for interacting with the <a href="https://clickup.com/api">ClickUp API</a>. This library provides an easy-to-use, type-safe interface for managing Workspaces (teams), Spaces, Folders, Lists, and Tasks in ClickUp.</p>

    <h2>Features</h2>
    <ul>
        <li>Fetch Workspaces (teams), Spaces, Folders, Lists, and Tasks from ClickUp.</li>
        <li>Retrieve detailed information about specific entities.</li>
        <li>Supports TypeScript for strong typing and autocompletion.</li>
        <li>Modular design with separate classes for each resource type.</li>
        <li>Built with <code>axios</code> for reliable HTTP requests.</li>
    </ul>

    <h2>Installation</h2>
    <p>Install the package via npm:</p>
    <pre><code>npm install @hot-gmbh/clickup</code></pre>
    <blockquote>
        <strong>Note:</strong> This assumes you’ll publish the package under the <code>@hot-gmbh</code> scope. Adjust the package name if you choose a different scope or name.
    </blockquote>

    <h2>Usage</h2>
    <p>This package implements the functionality documented in the <a href="https://clickup.com/api">ClickUp API documentation</a> and mirrors the routes available in their <a href="https://www.postman.com/clickup-api/clickup-public-api/collection/rekuqnj/clickup-api-v2-reference">Postman collection</a>.</p>

    <h3>Basic Example</h3>
    <pre><code class="language-typescript">

import { ClickUp } from '@hot-gmbh/clickup';

const apiKey = process.env.CLICKUP_API_KEY; // Replace with your ClickUp API key

const clickUp = new ClickUp(apiKey);

// Fetch all spaces for a team
const spaces = await clickUp.spaces.getAll('your_team_id');
console.log('Spaces:', spaces);
console.log('First space ID:', spaces[0].id);
</code></pre>

    <h3>Advanced Example</h3>
    <pre><code class="language-typescript">

import { ClickUp } from '@hot-gmbh/clickup';

async function main() {
const clickUp = new ClickUp(process.env.CLICKUP_API_KEY);

// Get all teams (workspaces)
const teams = await clickUp.teams.getAll();
const teamId = teams[0].id;

// Get spaces for a team, including archived ones
const spaces = await clickUp.spaces.getAll(teamId, true);
console.log('Spaces:', spaces);

// Get folders for a space
const spaceId = spaces[0].id;
const folders = await clickUp.folders.getAll(spaceId);
console.log('Folders:', folders);

// Get lists for a folder
const folderId = folders[0]?.id;
if (folderId) {
const lists = await clickUp.lists.getAll(folderId);
console.log('Lists:', lists);
}

// Get folderless lists for a space
const folderlessLists = await clickUp.lists.getFolderless(spaceId);
console.log('Folderless Lists:', folderlessLists);
}

main().catch(console.error);
</code></pre>

    <h2>API Documentation</h2>

    <h3>Initialization</h3>
    <pre><code class="language-typescript">

const clickUp = new ClickUp(apiKey: string, baseUrl?: string);
</code></pre>

<ul>
<li><code>apiKey</code>: Your ClickUp personal API token (e.g., <code>pk*xxxx*...</code>).</li>
<li><code>baseUrl</code>: Optional base URL for the ClickUp API (defaults to <code>https://api.clickup.com/api/v2</code>).</li>
</ul>

    <h3>Methods</h3>

    <h4>Teams (Workspaces)</h4>
    <p>Accessed via <code>clickUp.teams</code>.</p>
    <ul>
        <li><strong><code>getAll(): Promise&lt;Team[]&gt;</code></strong>
            <ul>
                <li>Fetches all teams (workspaces) accessible with the API key.</li>
                <li>Returns an array of <code>Team</code> objects.</li>
            </ul>
        </li>
    </ul>

    <h4>Spaces</h4>
    <p>Accessed via <code>clickUp.spaces</code>.</p>
    <ul>
        <li><strong><code>getAll(teamId: string | number, includeArchived?: boolean): Promise&lt;Space[]&gt;</code></strong>
            <ul>
                <li>Fetches all spaces for a given team.</li>
                <li><code>teamId</code>: The ID of the team/workspace.</li>
                <li><code>includeArchived</code>: Optional, includes archived spaces if <code>true</code> (default: <code>false</code>).</li>
                <li>Returns an array of <code>Space</code> objects.</li>
            </ul>
        </li>
    </ul>

    <h4>Folders</h4>
    <p>Accessed via <code>clickUp.folders</code>.</p>
    <ul>
        <li><strong><code>getAll(spaceId: string | number): Promise&lt;Folder[]&gt;</code></strong>
            <ul>
                <li>Fetches all folders within a space.</li>
                <li><code>spaceId</code>: The ID of the space.</li>
                <li>Returns an array of <code>Folder</code> objects or an empty array if none exist.</li>
            </ul>
        </li>
    </ul>

    <h4>Lists</h4>
    <p>Accessed via <code>clickUp.lists</code>.</p>
    <ul>
        <li><strong><code>getAll(folderId: string | number): Promise&lt;List[]&gt;</code></strong>
            <ul>
                <li>Fetches all lists within a folder.</li>
                <li><code>folderId</code>: The ID of the folder.</li>
                <li>Returns an array of <code>List</code> objects.</li>
            </ul>
        </li>
        <li><strong><code>getFolderless(spaceId: string | number): Promise&lt;List[]&gt;</code></strong>
            <ul>
                <li>Fetches all lists directly under a space (not in a folder).</li>
                <li><code>spaceId</code>: The ID of the space.</li>
                <li>Returns an array of <code>List</code> objects.</li>
            </ul>
        </li>
    </ul>

    <h3>Types</h3>
    <p>The library includes TypeScript interfaces for all resources:</p>
    <ul>
        <li><strong><code>Team</code></strong>: <code>{ id: string, name: string, color: string, avatar: string | null, members: any[] }</code></li>
        <li><strong><code>Space</code></strong>: <code>{ id: string, name: string, color: string, private: boolean, avatar: string | null, admin_can_manage: boolean, statuses: any[], multiple_assignees: boolean, features: any, archived: boolean, members: any[] }</code></li>
        <li><strong><code>Folder</code></strong>: <code>{ id: string, name: string, hidden: boolean }</code></li>
        <li><strong><code>List</code></strong>: <code>{ id: string, name: string, folder?: { id: string, name: string } }</code></li>
    </ul>
    <blockquote>
        <strong>Note:</strong> The <code>any</code> types (e.g., <code>statuses</code>, <code>features</code>, <code>members</code>) can be refined based on your needs. Contributions to improve these are welcome!
    </blockquote>

    <h2>Development</h2>

    <h3>Setup</h3>
    <ol>
        <li>Clone the repository:
            <pre><code>git clone https://github.com/hot-gmbh/clickup.git

cd clickup</code></pre>

</li>
<li>Install dependencies:
<pre><code>npm install</code></pre>
</li>
<li>Build the project:
<pre><code>npm run build</code></pre>
</li>
</ol>

    <h3>Scripts</h3>
    <ul>
        <li><strong><code>npm run build</code></strong>: Compiles TypeScript to JavaScript in the <code>dist/</code> folder.</li>
    </ul>

    <h3>Project Structure</h3>
    <pre><code>

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
</code></pre>

    <h2>Contributing</h2>
    <p>We welcome contributions! Please follow these steps:</p>
    <ol>
        <li>Fork the repository.</li>
        <li>Create a feature branch (<code>git checkout -b feature/your-feature</code>).</li>
        <li>Commit your changes (<code>git commit -m "Add your feature"</code>).</li>
        <li>Push to the branch (<code>git push origin feature/your-feature</code>).</li>
        <li>Open a Pull Request.</li>
    </ol>

    <h3>Guidelines</h3>
    <ul>
        <li>Follow TypeScript best practices.</li>
        <li>Add tests for new features (if a test suite is added).</li>
        <li>Update the README with new methods or changes.</li>
    </ul>

    <h2>License</h2>
    <p>This project is licensed under the MIT License. See the <a href="./LICENSE">LICENSE</a> file for details.</p>


    <h2>Issues</h2>
    <p>If you encounter bugs or have feature requests, please <a href="https://github.com/hot-gmbh/clickup/issues">open an issue</a> on GitHub.</p>

    <h2>Roadmap</h2>
    <ul>
        <li>Implement POST/PUT methods for creating/updating resources.</li>
    </ul>

    <h2>Acknowledgments</h2>
    <ul>
        <li>Built with <a href="https://github.com/axios/axios">axios</a> for HTTP requests.</li>
        <li>Inspired by the <a href="https://clickup.com/api">ClickUp API documentation</a>.</li>
    </ul>

</body>
</html>

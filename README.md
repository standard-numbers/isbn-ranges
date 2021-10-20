# ISBN ranges

![node/v](https://img.shields.io/node/v/@standard-numbers/isbn-ranges?label=Node.js&logo=nodedotjs)
![npm/v](https://img.shields.io/npm/v/@standard-numbers/isbn-ranges?label=latest&logo=npm)
![github/workflow](https://img.shields.io/github/workflow/status/standard-numbers/isbn-ranges/Test?label=test&logo=github)

This Node.js module allows to download the latest ISBN range message from the International ISBN Agency website and convert the data to the JSON format. Visit <https://www.isbn-international.org/range_file_generation/> to see details.

## License

This software is available under the [MIT license](https://opensource.org/licenses/MIT/). See `LICENSE.md` for the full license text.

## Installation

```sh
npm install --ignore-scripts -- @standard-numbers/isbn-ranges
```

## Usage

Add `"type": "module"` to `package.json`.

### TypeScript `~4` (using top-level `await`)

```sh
npm install --ignore-scripts --save-dev -- typescript@4 @types/node
```

<details>
<summary>tsconfig.json</summary>

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Node",
    "target": "ES2017"
  }
}
```
</details>

<details>
<summary>src/index.ts</summary>

```typescript
import {
  areEqual,
  getLatestMessage,
  JSONValue,
} from '@standard-numbers/isbn-ranges';
import { readFile, writeFile } from 'fs/promises';

// Download and parse the latest ISBN range message.
const latestMessage = await getLatestMessage();

const path = 'isbn-ranges.json';

try {
  // Get the previous message from the local filesystem.
  const data = await readFile(path, {
    encoding: 'utf8',
  });
  const oldMessage = JSON.parse(data) as JSONValue;
  // Compare. The first argument of the `equal` function must be an array!
  if (await areEqual([oldMessage, latestMessage])) {
    // There is no need to update the local file.
  } else {
    // Update the local file.
    await writeFile(path, JSON.stringify(latestMessage));
  }
} catch (error) {
  // The local file is not found. Create a new local file.
  await writeFile(path, JSON.stringify(latestMessage));
}
```
</details>

### TypeScript `~3.8.2`

```sh
npm install --ignore-scripts --save-dev -- typescript@~3.8.2 @types/node
```

<details>
<summary>tsconfig.json</summary>

```json
{
  "compilerOptions": {
    "module": "ES6",
    "moduleResolution": "Node"
  }
}
```
</details>

<details>
<summary>src/index.ts</summary>

```typescript
import {
  areEqual,
  getLatestMessage,
  JSONValue,
} from '@standard-numbers/isbn-ranges';
import { readFile, writeFile } from 'fs/promises';

// Download and parse the latest ISBN range message.
getLatestMessage().then((latestMessage: JSONValue) => {
  const path = 'isbn-ranges.json';

  // Get the previous message from the local filesystem.
  readFile(path, {
    encoding: 'utf8',
  }).then((data) => {
    const oldMessage = JSON.parse(data) as JSONValue;

    // Compare. The first argument of the `equal` function must be an array!
    areEqual([oldMessage, latestMessage]).then(async (equal) => {
      if (equal) {
        // There is no need to update the local file.
      } else {
        // Update the local file.
        await writeFile(path, JSON.stringify(latestMessage));
      }
    }).catch(() => {
      // Could not compare the two messages.
    });
  }).catch(async () => {
    // The local file is not found. Create a new local file.
    await writeFile(path, JSON.stringify(latestMessage));
  });
}).catch(() => {
  // Failed to download or parse the latest ISBN range message.
});
```
</details>

### JavaScript

<details>
<summary>src/index.js</summary>

```javascript
import {
  areEqual,
  getLatestMessage,
} from '@standard-numbers/isbn-ranges';
import { readFile, writeFile } from 'fs/promises';

// Download and parse the latest ISBN range message.
getLatestMessage().then((latestMessage) => {
  const path = 'isbn-ranges.json';

  // Get the previous message from the local filesystem.
  readFile(path, {
    encoding: 'utf8',
  }).then((data) => {
    const oldMessage = JSON.parse(data);

    // Compare. The first argument of the `equal` function must be an array!
    areEqual([oldMessage, latestMessage]).then(async (equal) => {
      if (equal) {
        // There is no need to update the local file.
      } else {
        // Update the local file.
        await writeFile(path, JSON.stringify(latestMessage));
      }
    }).catch(() => {
      // Could not compare the two messages.
    });
  }).catch(async () => {
    // The local file is not found. Create a new local file.
    await writeFile(path, JSON.stringify(latestMessage));
  });
}).catch(() => {
  // Failed to download or parse the latest ISBN range message.
});
```
</details>

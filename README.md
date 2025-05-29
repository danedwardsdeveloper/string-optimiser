# String Optimiser

A TypeScript utility for optimising strings within length constraints. Perfect for SEO meta titles, descriptions, and any content that needs to fit within specific character limits. Especially useful for programmatic content generation.

Takes a base phrase and an array of additional phrases, and selects one additional phrase to add to the end of the string so that it is as close to the maximum length without exceeding it.

## Installation

```bash
npm install string-optimiser

# or
pnpm add string-optimiser

# or
yarn add string-optimiser

```

## Quick Start

optimiseTitle and optimiseDescription are pre-configured with sensible metatitle and metadescription lengths from the [Detailed SEO browser extension](https://detailed.com/extension/).

**Metatitle:**
Between 50 & 65 characters

**Metadescription:**
Between 70 & 155 characters

```typescript
import { optimiseTitle, optimiseDescription } from 'string-optimiser';

const title = optimiseTitle({
	base: 'Chapter 1',
	additionalPhraseOptions: [
		'Crime and Punishment',
		'Crime and Punishment by Fyodor Dostoevsky',
	],
});
// Result: "Chapter 1 | Crime and Punishment by Fyodor Dostoevsky" (53 characters)

const description = optimiseDescription({
	base: 'Jane Eyre by Charlotte Brontë',
	additionalPhraseOptions: [
		'ClassicReader.org',
		'Read the classic novel on ClassicReader.org',
		"Read Charlotte Brontë's timeless Gothic romance about an independent governess on ClassicReader.org",
	],
});
// Result: "Jane Eyre by Charlotte Brontë | Read Charlotte Brontë's timeless Gothic romance about an independent governess on ClassicReader.org" (131 characters)
```

## Features

-  ✅ **Smart Selection**: Automatically chooses the best combination to fit your length constraints
-  ✅ **Multiple Base Options**: Use `baseOptions` to provide multiple starting points, incase your starting point might already be too long
-  ✅ **Flexible Configuration**: Create custom optimisers with your own length limits
-  ✅ **TypeScript Support**: Full type safety and IntelliSense
-  ✅ **Zero Dependencies**: Lightweight and fast
-  ✅ **Graceful Handling**: Warns when constraints can't be met & returns best available option

## API Reference

### Pre-configured Optimisers

#### `optimiseTitle(input)`

Optimises strings for meta titles (50-65 characters, separator: `" | "`).

#### `optimiseDescription(input)`

Optimises strings for meta descriptions (70-155 characters, separator: `" | "`).

### Input Options

#### Using a single base string:

```typescript
{
  base: string
  additionalPhraseOptions: string[]
}
```

#### Using multiple base options:

```typescript
{
  baseOptions: string[]
  additionalPhraseOptions: string[]
}
```

### Custom Optimiser

```typescript
import { initialiseStringOptimiser } from 'string-optimiser';

const customOptimiser = initialiseStringOptimiser({
	minimumLength: 20,
	maximumLength: 50,
	separator: ' - ', // Optional, defaults to ' | '
});

const result = customOptimiser({
	base: 'My Content',
	additionalPhraseOptions: ['Additional Context', 'More Details'],
});
```

## Examples

### Basic Usage with Single Base

```typescript
const title = optimiseTitle({
	base: 'Chapter 1',
	additionalPhraseOptions: [
		'Crime and Punishment',
		'Crime and Punishment by Fyodor Dostoevsky',
	],
});
// "Chapter 1 | Crime and Punishment by Fyodor Dostoevsky" (53 characters)
```

### Using Multiple Base Options

```typescript
const title = optimiseTitle({
	baseOptions: ['Chapter 1', 'Chapter 1, Mrs. Rachel Lynde Is Surprised'],
	additionalPhraseOptions: [
		'Anne of Green Gables',
		'Anne of Green Gables by Lucy Maud Montgomery',
	],
});
// "Chapter 1, Mrs. Rachel Lynde Is Surprised | Anne of Green Gables" (64 characters)
```

### Custom Configuration

```typescript
import { initialiseStringOptimiser } from 'string-optimiser';

const socialMediaOptimiser = initialiseStringOptimiser({
	minimumLength: 10,
	maximumLength: 280,
	separator: ' • ',
});

const post = socialMediaOptimiser({
	base: 'Just finished reading',
	additionalPhraseOptions: [
		'an amazing book',
		'Crime and Punishment by Dostoevsky - absolutely brilliant!',
	],
});
```

## Configuration Objects

You can import the configuration objects for custom use, which have helpful defaults from the Detailed SEO browser extension

```typescript
import { metaTitleConfig, metaDescriptionConfig } from 'string-optimiser';

console.log(metaTitleConfig);
// { minimumLength: 50, maximumLength: 65 }

console.log(metaDescriptionConfig);
// { minimumLength: 70, maximumLength: 155 }
```

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
	OptimiserInput,
	InitialiserConfig,
	InitialisedOptimiser,
} from 'string-optimiser';
```

## Contributing

Contributions welcome!

## License

MIT

## Keywords

string, optimiser, optimizer, seo, meta, title, description, length, constraint, typescript, programmatic, content-generation, web-development, metadata, character-limit, text-optimization, string-manipulation, cms, headless-cms, automated-seo, content-management

# Linagora AI Prompts

PromptFoo evaluation suite for testing LLM prompts.

### Prerequisites

Before running the project, make sure you have the following installed:

- `git`
- `npm`
- `nvm`
- **Node.js 22** (recommended)

If needed, install and use Node.js 22 with:
    ```bash
    nvm install 22
    nvm use 22
    
Update promptfoo at the last version : 
  ```bash
  npm install promptfoo@latest --save-dev

## Quick Start

1. Copy `env.example` to `.env` and fill in your API key:
   ```bash
   cp env.example .env
   sudo nano .env
   #fill your API key

2. Run evaluations:
   ```bash
   npm install
   npm run eval
   ```

3. View results:
   ```bash
   npm run view
   ```

## Prompts

Available prompts are in the `prompts/` directory.

## Commands

- `npm run eval` - Run evaluations
- `npm run view` - Open results browser
- `npm run export` - Export prompts to `build/prompts.json`

## Adding Prompts

Create a file in `prompts/` following the existing pattern. See [AGENTS.md](AGENTS.md) for details.

## License

AGPL-3.0

# mc-server-status

Directory `data` contains database files. Make sure you mount it in order to persist data.

## Development
- `npm start` - start app
- `npm run dev` - start app with watch mode (restart on file change)
- `npm run test` - run tests
- `npm run test:update-snapshots` - for auto updating tests snapshots
- `npm run prisma:generate` - generate TypeScript types from Prisma schema. Automatically run after `npm install`.
- `npm run prisma:format` - formatting and validation of Prisma schema
- `npm run prisma:studio` - open DB Explorer (Prisma Studio). It will be available on http://localhost:5555.
- `npm run prisma:migrate` - run in order to create DB schema migration. It will create a new script in `./prisma/migrations` that will be executed on production DB after deployment.

## Environment variables
Validation located in the file [config.ts](src/config.ts). Refer to [.example.env](.example.env) for examples. Only 3 variables are required.

#### NODE_ENV *
- Options: `development`, `production`, `test`

#### DATABASE_URL *
- SQLite example: `file:../data/dev.db`
- Postgres example: `postgresql://user:pass@host:5432/databaseName?schema=public`

#### BOT_TOKEN *
- Token obtained from [@BotFather](https://t.me/BotFather) like `123456789:hiu89fwefh98hadoji23rfd09`

#### LOG_LEVEL
- Options: `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `silent`
- Default: `warn`

#### CHECKPOINT_DISABLE
- [Prisma Telemetry](https://www.prisma.io/docs/concepts/more/telemetry). 1 - disable, 0 - enable
- Options: `0`, `1`
- Default: `0`

#### BOT_SERVER_HOST
- For metrics and webhook
- Default: `0.0.0.0`

#### BOT_SERVER_PORT
- For metrics and webhook
- Default: `5500`

#### BOT_ALLOWED_UPDATES
- Complete list of possible updates is [here](https://core.telegram.org/bots/api#update)
- Default: `[]` - all updates are allowed

#### BOT_WEBHOOK
- Like https://www.example.com/<BOT_TOKEN>
- Default: `null` - use polling mechanism. See difference: [Long Polling vs. Webhooks](https://grammy.dev/guide/deployment-types)

#### BOT_ADMIN_USER_ID
- Telegram user id of the bot admin (numeric). The role is assigned on every start of the bot.

#### SENTRY_DSN
- Error tracking service [sentry.io](https://sentry.io)
- Example: `https://example@example.ingest.sentry.io/example`

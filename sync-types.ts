import { typeSync } from '@hakit/core/sync'

async function runner() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await typeSync({
    url: process.env.HA_URL ?? '',
    token: process.env.HA_TOKEN ?? '',
  })
}

void runner()

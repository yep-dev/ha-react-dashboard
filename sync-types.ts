import { typeSync } from '@hakit/core/sync'

async function runner() {
  await typeSync({
    url: process.env.HA_URL || '',
    token: process.env.HA_TOKEN || '',
  })
}
runner()

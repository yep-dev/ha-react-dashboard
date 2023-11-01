import fetch from 'node-fetch'
import * as https from 'https'

const ENTITY_ID = 'input_datetime.trigger_dashboard_reload'
const date = new Date().toISOString()
const url = `${process.env.HA_URL}/api/services/input_datetime/set_datetime`
const headers = {
  Authorization: `Bearer ${process.env.HA_TOKEN}`,
  'Content-Type': 'application/json',
}
const agent = new https.Agent({
  rejectUnauthorized: false,
})

const data = JSON.stringify({
  entity_id: ENTITY_ID,
  datetime: date,
})

fetch(url, {
  method: 'POST',
  headers: headers,
  body: data,
  agent,
})
  .then((response: { status: number }) => {
    if (response.status === 200) {
      console.log('Datetime entity updated successfully.')
    } else {
      console.error('Error updating datetime entity.', response)
    }
  })
  .catch((error) => {
    console.error('Error:', error)
  })

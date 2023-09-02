import fetch from 'node-fetch'

const ENTITY_ID = "input_datetime.trigger_dashboard_reload";
const date = new Date().toISOString();
const url = `${process.env.HA_URL}/api/services/input_datetime/set_datetime`;
const headers = {
  "Authorization": `Bearer ${process.env.HA_TOKEN}`,
  "Content-Type": "application/json",
};

const data = JSON.stringify({
  entity_id: ENTITY_ID,
  datetime: date,
});

fetch(url, {
  method: 'POST',
  headers: headers,
  body: data,
})
.then((response: { status: number; }) => {
  if (response.status === 200) {
    console.log("Datetime entity updated successfully.");
  } else {
    console.error("Error updating datetime entity.", response);
  }
})
.catch((error: any) => {
  console.error("Error:", error);
});

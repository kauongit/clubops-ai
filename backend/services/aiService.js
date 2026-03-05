import fetch from "node-fetch";

export async function generateAssets(data) {

const prompt = `
Generate event assets.

Event: ${data.eventName}
Club: ${data.clubName}
Date: ${data.eventDate}
Description: ${data.eventDescription}

Return JSON with:
poster
socialCaption
email
certificate
summary
`;

const response = await fetch(
"https://api.together.xyz/v1/chat/completions",
{
method: "POST",
headers: {
Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
messages: [{role:"user",content:prompt}]
})
}
);

const result = await response.json();

return result.choices[0].message.content;
}
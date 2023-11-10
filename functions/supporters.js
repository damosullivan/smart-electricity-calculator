export async function onRequestGet(context) {

  const response = await fetch("https://developers.buymeacoffee.com/api/v1/supporters", {
    headers: {
      Authorization: `Bearer ${context.env.COFFEE_API_KEY}`,
    },
  })

	const result = await response.json()

  return new Response(
		JSON.stringify(result),
		{
			headers: {
				// we'll set a CORS header to allow access to this resource from everywhere
				'Access-Control-Allow-Origin': '*',
			},
		}
	)}



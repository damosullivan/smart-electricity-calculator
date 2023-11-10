export async function onRequestGet(context) {

  const response = await fetch("https://developers.buymeacoffee.com/api/v1/supporters", {
    headers: {
      Authorization: `Bearer ${context.env.COFFEE_API_KEY}`,
    },
  })

	const result = await response.json()
  const supporter_names = result.data.map(s => s.supporter_name);

  return new Response(
		JSON.stringify(supporter_names),
		{
			headers: {
				// we'll set a CORS header to allow access to this resource from everywhere
				'Access-Control-Allow-Origin': '*',
			},
		}
	)}



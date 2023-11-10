// export async function onRequestGet(context) {
//   const supporters = await new Request("https://developers.buymeacoffee.com/api/v1/supporters", {
//     headers: {
//       Authorization: `Bearer ${context.env.COFFEE_API_KEY}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((json) => json.data);

//     console.log(supporters);

//     return supporters.sort((a, b) => {
//       return a.support_coffees - b.support_coffees;
//     })
//     .map((d) => {
//       d.supporter_name;
//     });
// }


// 1. listen for fetch events
addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request))
})

// 2. event handler which returns a Response object
async function handleRequest(event) {

	// we'll use `fetch` in combination with `await` so we don't have to manually resolve the returned `Promise`
	// this is why we defined the whole function as `async`, so we can use `await`
	const response = await fetch("https://developers.buymeacoffee.com/api/v1/supporters", {
    headers: {
      Authorization: `Bearer ${context.env.COFFEE_API_KEY}`,
    },
  })

	// `fetch` will resolve to a [Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response)
	// We will use the `json` method to return the responses results as a JavaScript object
	// note that we'll again use `await` since .json() returns a `Promise`

	const result = await response.json()

  return new Response(
		// we'll use JSON.stringify() to convert the returned JavaScript object to a string which can be sent in a response
		JSON.stringify(response),
		{
			headers: {
				// we'll set a CORS header to allow access to this resource from everywhere
				'Access-Control-Allow-Origin': '*',
			},
		}
	)

}

async function fetchPage(context, page) {
  const response = await fetch(
    `https://developers.buymeacoffee.com/api/v1/supporters?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${context.env.COFFEE_API_KEY}`,
      },
    }
  );
  return await response.json();
}

export async function onRequestGet(context) {
  const page = 1;
  const supporter_names = [];

  do {
    const response = fetchPage(context, page);
    supporter_names.push(...response.data.map((s) => s.supporter_name));
    page++;
  } while (response.next_page);

  return new Response(JSON.stringify(supporter_names), {
    headers: {
      // we'll set a CORS header to allow access to this resource from everywhere
      "Access-Control-Allow-Origin": "*",
    },
  });
}

async function fetchPage(context, page) {
  const response = await fetch(
    `https://developers.buymeacoffee.com/api/v1/supporters?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${context.env.COFFEE_API_KEY}`,
      },
      cf: {
        cacheTtl: 60,
        cacheEverything: true,
      },
    }
  );
  return await response.json();
}

export async function onRequestGet(context) {
  let page = 1;
  let response;
  const supporters = [];

  do {
    response = await fetchPage(context, page);
    supporters.push(...response.data);
    page++;
  } while (!!response.next_page_url);

  const supporter_names = supporters
    .reverse()
    .sort((a, b) => b.support_coffees - a.support_coffees)
    .map((s) => s.supporter_name);

  return new Response(JSON.stringify(supporter_names), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=1800",
      "Content-Type": "application/json",
    },
  });
}

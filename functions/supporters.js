export async function onRequestGet(context) {
  const supporters = await new Request("https://developers.buymeacoffee.com/api/v1/supporters", {
    headers: {
      Authorization: `Bearer ${context.env.COFFEE_API_KEY}`,
    },
  })
    .then((res) => res.json())
    .then((json) => json.data);

    console.log(supporters);

    return supporters.sort((a, b) => {
      return a.support_coffees - b.support_coffees;
    })
    .map((d) => {
      d.supporter_name;
    });
}

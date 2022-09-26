import * as Scry from "scryfall-sdk";

export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const query = useQuery(event);
  const name = query.name as string;
  const card = await Scry.Cards.byName(decodeURI(name));
  return card;
});

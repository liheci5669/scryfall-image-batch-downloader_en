import * as Scry from "scryfall-sdk";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  const id = query.id as string;
  const lang = query.lang as string;
  const cards = await Scry.Cards.search(`oracleid:${id} lang:${lang}`, {
    order: "released",
    unique: "prints",
  })
    .cancelAfterPage()
    .waitForAll();
  return cards;
});

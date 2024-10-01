import * as Scry from "scryfall-sdk";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const name = query.name as string;
  const card = await Scry.Cards.byName(decodeURI(name), true);

  try {
    const enCard = await Scry.Cards.bySet(
      card.set,
      parseInt(card.collector_number),
      "en"
    );
    return enCard;
  } catch (e) {
    return card;
  }
});

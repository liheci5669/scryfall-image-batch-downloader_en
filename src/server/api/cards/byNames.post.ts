import * as Scry from "scryfall-sdk";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const cardNames = body.cardNames as string[];

  const cards: Scry.Card[] = [];
  const jaCards: Scry.Card[] = [];
  const errorCardNames: string[] = [];

  for (const name of cardNames) {
    console.log(`Fetching: ${name}`);

    const card = await Scry.Cards.byName(name);
    if (card) {
      cards.push(card);
      console.log(`Fetched: ${name}`);
    } else {
      errorCardNames.push(name);
      console.error(`Failed: ${name}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  for (const card of cards) {
    console.log(`Search Japnese Card with: ${card.name}`);

    let jaCard: Scry.Card;

    try {
      jaCard = await Scry.Cards.bySet(
        card.set,
        parseInt(card.collector_number),
        "ja"
      );
      jaCards.push(jaCard);
      console.log(`Found: ${jaCard.name}`);
    } catch (e) {
      jaCards.push(card);
      console.log(`Not Found: ${card.name}`);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  return { cards: jaCards, errorCardNames: errorCardNames };
});

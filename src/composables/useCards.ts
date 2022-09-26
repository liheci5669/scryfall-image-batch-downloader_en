import type { Ref } from "vue";
import * as Scry from "scryfall-sdk";

export const useCards = () => {
  const cards: Ref<Scry.Card[]> = useState("cards", () => []);
  const cardNames: Ref<string[]> = useState("cardNames", () => []);
  const selectedCard: Ref<Scry.Card> = useState(
    "selectedCard",
    () => undefined
  );

  const addCard = (cards: Ref<Scry.Card[]>) => (card: Scry.Card) => {
    cards.value.push(card);
  };
  const updateCardNames = (cardNames: Ref<string[]>) => (value: string[]) => {
    cardNames.value = [...value];
  };
  const selectCard = (selectedCard: Ref<Scry.Card>) => (value: Scry.Card) => {
    selectedCard.value = value;
  };

  return {
    cards: readonly(cards),
    addCard: addCard(cards),
    cardNames: readonly(cardNames),
    updateCardNames: updateCardNames(cardNames),
    selectedCard: readonly(selectedCard),
    selectCard: selectCard(selectedCard),
  };
};

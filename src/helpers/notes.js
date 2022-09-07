import { getNormalizedDate } from "../helpers/formatDate";

export const getExistedNotes = (notes, year, month, day) => {
  return notes.filter(({ id }) => id === getNormalizedDate(year, month, day));
};

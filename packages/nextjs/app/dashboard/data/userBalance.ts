import { Token, tokenList } from "./tokenList";

export type PortofolioItem = Token & {
  quantity: number;
};

export const portfolioItems: PortofolioItem[] = [
  {
    ...tokenList[0],
    quantity: 10,
  },
  {
    ...tokenList[1],
    quantity: 12,
  },
];

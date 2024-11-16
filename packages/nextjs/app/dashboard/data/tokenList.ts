export type Token = {
    id: number;
    name: string;
    symbol: string;
    logo_url: string;
    address: string;
    value: number;
}


export const tokenList: Token[] = [
    {
        id: 1,
        name: "US T-Bills",
        symbol: "USTBL",
        logo_url : "https://assets.coingecko.com/coins/images/39666/standard/USTB.png?1723541269",
        address: "0x",
        value: 1000
    },
    {
        id: 2,
        name: "Anemoy Liquid Treasury Fund",
        symbol: "ALTF1",
        logo_url :"https://readi.fi/media/anemoy-picto_07WBgwq.png",
        address: "0x",
        value: 2000
    }
]
export type SteamProfile = {
    iD: number,
    username: string,
    fullAvatarImg: string,
    countryCode: string,
    inventoryValue: number,
    inventorySize: number
}

export type Item = {
    name: string,
    image: string,
    pricelatest: number,
    pricelatestsell: number,
    pricemedian: number,
    priceavg: number,
    pricemin: number,
    pricemax: number,
    pricesafe7d: number,
    pricesafe30d: number,
    pricesafe90d: number,
    offervolume: number,
    sold24h: number,
    sold7d: number,
    sold30d: number,
    sold90d: number,
}

export type History = {
    avg: number,
    median: number,
    price: number,
    sold: number,
    createdat: string
}
import { Item, SteamProfile, History } from "./CSAPIModels";

export const API_KEY = "YPVIUFGK5JYWHLVM";

export default class CSAPI {

    private static _instance: CSAPI;

    private constructor() { }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public async fetchItemStats(hashname: string): Promise<Item | null> {
        const apiUrl = `https://www.steamwebapi.com/steam/api/item?key=${API_KEY}&market_hash_name=${hashname}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log(data);

            const dataProfile: Item = {
                name: data.name,
                image: data.image,
                pricelatest: data.pricelatest,
                pricelatestsell: data.pricelatestsell,
                pricemedian: data.pricemedian,
                priceavg: data.priceavg,
                pricemin: data.pricemin,
                pricemax: data.pricemax,
                pricesafe7d: data.pricesafe7d,
                pricesafe30d: data.pricesafe30d,
                pricesafe90d: data.pricesafe90d,
                offervolume: data.offervolume,
                sold24h: data.sold24h,
                sold7d: data.sold7d,
                sold30d: data.sold30d,
                sold90d: data.sold90d,
            }

            console.log("fetchItemStats run.");

            console.log(data);
            return dataProfile;

        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    public async fetchRandomProfiles(limit: number): Promise<SteamProfile | null> {
        const apiUrl = `https://www.steamwebapi.com/explore/api/random?key=${API_KEY}&limit=${limit}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const dataProfile: SteamProfile = {
                iD: data[0].steamID,
                username: data[0].personaname,
                fullAvatarImg: data[0].avatarfull,
                countryCode: data[0].loccountrycode,
                inventoryValue: data[0].inventoryworth.worth,
                inventorySize: data[0].inventoryworth.size
            }

            console.log("fetchRandomProfiles run.");

            console.log(data);
            return dataProfile;

        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    public async fetchItemHistory(hashname: string): Promise<History[] | null> {
        const apiUrl = `https://www.steamwebapi.com/steam/api/history?key=${API_KEY}&market_hash_name=${hashname}&start_date=2023-01-01&end_date=2024-01-01`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
    
            const historyList: History[] = data.map((item: any) => {
                return {
                    avg: item.avg,
                    median: item.median,
                    price: item.price,
                    sold: item.sold,
                    createdat: item.createdat,
                };
            });
    
            console.log("history " + JSON.stringify(historyList))
            return historyList; // Return the array of history objects
    
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }
    

}


export const CSAPIInstance = CSAPI.Instance;

/*

    "pricelatest": 124.85,
    "pricelatestsell": 117.65,
    "pricemix": 117.65,
    "pricemedian": 125.85,
    "pricereal": 75,
    "pricesafe": 115.74,
    "priceavg": 150.22,
    "pricemin": 97.47,
    "pricemax": 164.04,
    "pricesafe24h": 106.86,
    "pricesafe7d": 106.86,
    "pricesafe30d": 117.82,
    "pricesafe90d": 125.77,
    "trendpoint": 40,
    "offervolume": 47,
    "hourstosold": 3,
    "sold24h": 12,
    "sold7d": 55,
    "sold30d": 249,
    "sold90d": 896,
    "buyorderprice": 115.74,
    "buyordermedian": 115.7,
*/
/*
[
    {
        "id": 103705028,
        "avg": 1264.02,
        "median": 1264.02,
        "price": 1326.5,
        "sold": 2,
        "ismonthly": false,
        "createdat": "2023-11-15T00:00:00+00:00",
        "itemid": "a12808b2-ce7e-45c8-a759-706a36e6bcfc"
    },
    {
        "id": 103704996,
        "avg": 1433.54,
        "median": 1433.54,
        "price": 1433.54,
        "sold": 1,
        "ismonthly": false,
        "createdat": "2023-10-26T00:00:00+00:00",
        "itemid": "a12808b2-ce7e-45c8-a759-706a36e6bcfc"
    },
    {
        "id": 103704977,
        "avg": 1891.59,
        "median": 1891.59,
        "price": 1891.59,
        "sold": 1,
        "ismonthly": false,
        "createdat": "2023-10-06T00:00:00+00:00",
        "itemid": "a12808b2-ce7e-45c8-a759-706a36e6bcfc"
    },
    {
        "id": 103704937,
        "avg": 1676.22,
        "median": 1676.22,
        "price": 1676.22,
        "sold": 1,
        "ismonthly": false,
        "createdat": "2023-09-16T00:00:00+00:00",
        "itemid": "a12808b2-ce7e-45c8-a759-706a36e6bcfc"
    },
    {
        "id": 103704926,
        "avg": 1566.11,
        "median": 1566.11,
        "price": 1566.11,
        "sold": 1,
        "ismonthly": false,
        "createdat": "2023-09-06T00:00:00+00:00",
        "itemid": "a12808b2-ce7e-45c8-a759-706a36e6bcfc"
    }
]
*/
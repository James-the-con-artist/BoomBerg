import './App.css';
import './css/dashboard.css';
import { useState } from 'react';
import { CSAPIInstance } from './classes/CounterStrikeApi';
import SearchBar from './components/search';
import {Line} from "react-chartjs-2";
import { History } from './classes/CSAPIModels';
import OpenAIChatbot from './classes/OpenAIAPI';


function App() {

  const OPENAI_KEY = "INSERT-KEY";
  //itemStats useStates
  const [itemName, setItemName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [pricemed, setPriceMed] = useState<number>(0);
  const [exists, setExists] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [priceLatest, setPriceLatest] = useState<number>(0);
  const [pricelatestsell, setPriceLatestSell] = useState<number>(0);
  const [priceavg, setPriceAvg] = useState<number>(0);
  const [pricemin, setPriceMin] = useState<number>(0);
  const [pricemax, setPriceMax] = useState<number>(0);
  const [pricesafe7d, setPriceSafe7d] = useState<number>(0);
  const [pricesafe30d, setPriceSafe30d] = useState<number>(0);
  const [pricesafe90d, setPriceSafe90d] = useState<number>(0);
  const [offervolume, setOfferVolume] = useState<number>(0);
  const [sold24h, setSold24h] = useState<number>(0);
  const [sold7d, setSold7d] = useState<number>(0);
  const [sold30d, setSold30d] = useState<number>(0);
  const [sold90d, setSold90d] = useState<number>(0);

  const [infoText, setInfoText] = useState<string>("");
  //fetch itemHistory useStates
  const [avg, setAvg] = useState(0);
  const [median, setMedian] = useState(0);
  const [price, setPrice] = useState(0);
  const [sold, setSold] = useState(0);
  const [createdat, setCreatedAt] = useState("");
  const [recomendation, setRecomendation] = useState<string>("");
  const [historyData, setHistoryData] = useState<History[]>([]);

  const search = (name: string) => {
    let name_: string = "";
    let image_ = "";
    let pricemed_ = 0;
    let priceLatest_ = 0;
    let priceLatestSell_ = 0;
    let priceavg_ = 0;
    let pricemin_ = 0;
    let pricemax_ = 0;
    let pricesafe7d_ = 0;
    let pricesafe30d_ = 0;
    let pricesafe90d_ = 0;
    let offervolume_ = 0;
    let sold24h_ = 0;
    let sold7d_ = 0;
    let sold30d_ = 0;
    let sold90d_ = 0;
    
    //itemHistory temp vars
    let avg_ = 0;
    let median_ = 0;
    let price_ = 0;
    let sold_ = 0;
    let createdat_ = "";

    setSearching(true);
    setExists(false);

    CSAPIInstance.fetchItemHistory(name)
    .then((val) => {
      if (val != null) {
        setHistoryData(val);
        setRecomendation(determineAction(val));

      }
    })

    CSAPIInstance.fetchItemStats(name)
      .then((val => {
        if (val != null) {

          image_ = val.image;
          pricemed_ = val.pricemedian;
          name_ = name;
          
          priceLatest_ = val.pricelatest;
          priceLatestSell_ = val.pricelatestsell;
          priceavg_ = val.priceavg;
          pricemin_ = val.pricemin;
          pricemax_ = val.pricemax;
          pricesafe7d_ = val.pricesafe7d;
          pricesafe30d_ = val.pricesafe30d;
          pricesafe90d_ = val.pricesafe90d;
          offervolume_ = val.offervolume;
          sold24h_ = val.sold24h;
          sold7d_ = val.sold7d;
          sold30d_ = val.sold30d;
          sold90d_ = val.sold90d;
          
          setItemName(name_);
          setImage(image_);
          setPriceMed(pricemed_);
          setPriceLatest(priceLatest_);
          setPriceLatestSell(priceLatestSell_);
          setPriceAvg(priceavg_);
          setPriceMin(pricemin_);
          setPriceMax(pricemax_);
          setPriceSafe7d(pricesafe7d_);
          setPriceSafe30d(pricesafe30d_);
          setPriceSafe90d(pricesafe90d_);
          setOfferVolume(offervolume_);
          setSold24h(sold24h_);
          setSold30d(sold30d_);
          setSold7d(sold7d_);
          setSold90d(sold90d_);

          console.log(JSON.stringify(historyData));

          OpenAIChatbot.getInstance(OPENAI_KEY).sendMessage("According to this data of the price history and volume: " + JSON.stringify(historyData) + " we have decided to " + recomendation + " this item: " + name + ". why would we make this decision?" ).then(
            (response) => {
              setInfoText(response);
              setExists(true);
              setSearching(false);
            }
          )
          
        } else {
          setExists(false);
        }
      })).catch((e) => {
        setExists(false);
        setSearching(false);
      })

  }

  const determineAction = (previousMonths:History[]):string => {

    let total = 0;
    previousMonths.forEach(element => {
      total += element.avg
    });

    const averageofAvgs = total/previousMonths.length;

    if (pricelatestsell > averageofAvgs){
      return "SELL or NO ACTION"
    } else if (pricelatestsell < averageofAvgs){
      return "BUY or HOLD"
    } else {
      return "NO ACTION"
    }

  }


  return (
    <div className='App'>
      <SearchBar onPress={search} />
      {exists ?
        <>
        <div className = "row" >
          <div className='column center'>
            <text className='header-text padding'>{itemName}</text>
            <div className="standard-box image-box">
              < img className="image" src={image} />
            </div>
          <text className='header-text green padding'>${pricemed}</text>
          <text className='header-text'>{recomendation}</text>
          </div>
          <div className='column padding margin-top'>
            <text className="body-text">Latest Listed Price: ${priceLatest}</text>
            <text className="body-text">Latest Sold Price: ${pricelatestsell}</text>
            <text className="body-text">Average Price: ${priceavg}</text>
            <text className="body-text">Minimum Price: ${pricemin}</text>
            <text className="body-text">Maximum Price: ${pricemax}</text>
            <text className="body-text">Safe Price (7d): ${pricesafe7d}</text>
            <text className="body-text">Safe Price (30d): ${pricesafe30d}</text>
            <text className="body-text">Safe Price (90d): ${pricesafe90d}</text>
            <text className="body-text">Offer Volume: {offervolume}</text>
            <text className="body-text">Amount Sold (24h): {sold24h}</text>
            <text className="body-text">Amount Sold (7d): {sold7d}</text>
            <text className="body-text">Amount Sold (30d): {sold30d}</text>
            <text className="body-text">Amount Sold (90d): {sold90d}</text>
          </div>

          <div className='column padding margin-top'>          
            <text className="body-text">History:</text>
              <ul className='column2 margin-top'>
              {historyData.slice(0,5).map((data) => <text className="body-text padding">Date: {data.createdat.slice(0,7)} {'\n'} Price Avg: ${data.avg}{'\n'} Volume: {data.sold}</text>)}
              </ul>
          </div>
        <div>
        </div>

        </div>
        <text className="body-text">Analysis: {infoText}</text>
        </>
        : <>
          {searching ?
            <text className="header-text">Searching and Analyzing...</text>
            :
            <text className="header-text">Please Search A Valid Skin. Are You Sure The Wear Exists?</text>
          }
        </>
      }

    </div>
  );
}

export default App;


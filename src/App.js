import React, {useState, useEffect} from "react";
import './App.scss';
import COLORS_ARRAY from "./colorsArray"
import tweetIcon from "./imagenes/icons8-twitter-30.png"
import {gsap} from "gsap";


let quoteDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {

  const [accentColor, setAccentColor] = useState("#16a085")

  const [quote, setQuote] = useState("Genius is one percent inspiration and ninety-nine percent perspiration.")

  const [author, setAuthor] = useState("Thomas Edison")

  const [quotesArray, setQuotesArray] = useState(null)

  const changeQuoteAndAuthor = ()=> {
    setQuote("adddsss");
    setAuthor("Juan")
  }

    const fetchQuotes = async(url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  };

  useEffect(()=> {

      gsap.from("#text", {duration:1, color: "white"}) 

  }, [accentColor])

  useEffect(()=> {  
    fetchQuotes(quoteDB)
  }, [quoteDB])
  
  const getRandomQuote = ()=> {

    let randomIntegrer = Math.floor(quotesArray.length*Math.random())
    let randomIntegrerColor = Math.floor(COLORS_ARRAY.length*Math.random())


    setAccentColor(COLORS_ARRAY[randomIntegrerColor])
    setQuote(quotesArray[randomIntegrer].quote)
    setAuthor(quotesArray[randomIntegrer].author)

  };

  useEffect(()=> {

    gsap.to("#text", {duration:2, color: accentColor}) 
    gsap.from("#author", {duration:2, color: "white"}) 
    gsap.to("#author", {duration:2, color: accentColor}) 
    gsap.to(".App", {duration:2, backgroundColor: accentColor})


}, [accentColor])

  return (
    <div className="App" style={{
      backgroundColor: accentColor
      }}>
      
      <header className="App-header">     
      <div id="quote-box" style={{color: accentColor}}>
        <p id="text">
         "{quote}"
        </p>

        <p id="author">- {author}</p>
        <div className="container">
        <div className="row">
        
        <div className=" m-1 m-md-0 button col-12 col-md-6 d-flex justify-content-center">
        <a id="tweet-quote" className="btn" target="_blank" style={{backgroundColor: accentColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)}><img src={tweetIcon}/></a>
        </div>
        <div className=" m-1 m-md-0 col-12 col-md-6 d-flex justify-content-center">
        <button className="btn py-2" id="new-quote" style={{backgroundColor: accentColor}} onClick={()=> {getRandomQuote()}}>Change Quote</button>
        </div>
        </div>
        </div>
        </div>
      </header>
      </div>
    
  );
}

export default App;

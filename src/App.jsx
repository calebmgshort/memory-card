import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Cards from './components/Cards';

function App() {

  // Design:
  // Pokemon
  // Title
  // Description
  // Score
  // Best score
  // Card component (img, name, and onClick inputs) 
  // Fetch 12 cards once at beginning of game, into array
  // On card click,
  // - shuffle cards
  // - if correct, add to score, add card id to already_seen
  // - if finished or wrong, reset score and cards

  const [cards, setCards] = useState([]);
  const [shuffled, setShuffled] = useState(false);
  const [clicked, setClicked] = useState(new Set());
  const [bestScore, setBestScore] = useState(0);


  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  const shuffleCards = () => {
    let currentIndex = cards.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex], cards[currentIndex]];
    }
    setShuffled(!shuffled);
  }

  const handleClick = (name) => {
    return () => {
      if(clicked.size == cards.length) {
        clicked.clear();
      }
      if(clicked.has(name)) {
        clicked.clear();
      } else {
        clicked.add(name);
        if(clicked.size > bestScore) {
          setBestScore(clicked.size);
        }
      }
      shuffleCards();
      setCards(cards);
    }
  }

  useEffect(() => {
    let tmp_cards = [];
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0").then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the response body as JSON
      return response.json();
    }).then(jsonBody => {
      tmp_cards = jsonBody.results;
      let promises = [];
      for(let card of tmp_cards) {
        promises.push(fetch(card.url).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Parse the response body as JSON
          return response.json();
        }).then(pokemon_details => {
          card.img = pokemon_details['sprites']['front_default'];
        }));
      }
      return Promise.all(promises);
    }).then(() => {
      setCards(tmp_cards);
    });
  }, []);

  return (
    <>
      <Header score={clicked.size} bestScore={bestScore} />
      <Cards cards={cards} handleClick={handleClick} />
    </>
  )
}

export default App

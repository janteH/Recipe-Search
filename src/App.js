import './App.css';
import { useState } from 'react';

const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  async function recipes (e) {
    e.preventDefault();
    try {
      const address = URL;
      const response = await fetch(address + search);

      if (response.ok) {
        const json = await response.json();
        setResult(json.meals);
      } else {
        alert ('Error retrieving recipes.');
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div id="container">
      <h3>Recipe book</h3>
      <form>
        <div>
          <label>Search for recipe</label>
          <input type="text" placeholder='ingredient or recipe' value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div>
        <input type='submit' value='Search' onClick={ (e) => recipes(e) } />
        </div>
      </form>
      <div>
        {
          result.map( recipe => {
              return (
                <p key= { recipe.strMeal }>
                <b> { recipe.strMeal } </b> <br/>
                <img src={ recipe.strMealThumb } width="20%"></img> <br/>
                <a href={ recipe.strSource } >Link to recipe</a>
                </p>
              )
            }
          )
        }
    </div>
    </div>
  );
}

export default App;
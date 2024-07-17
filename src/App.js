import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const limit = 100;

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //最初のページは１なので、初期値は１
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchCharacters();
  }, []);

  //ここはじゃけいさん的コード
  // axios.get("https://narutodb.xyz/api/character").then((res) => {
  //   console.log(res.data);
  // });

  //ここはくるしばさんコード
  const fetchCharacters = async (page) => {
    setIsLoading(true);
    const apiUrl = "https://narutodb.xyz/api/character";

    const result = await axios.get(apiUrl, { params: { page, limit } });
    setCharacters(result.data.characters);
    console.log(result);
    setIsLoading(false);
  };

  //Nextボタンをクリックした時の処理
  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  };

  //Prevボタンをクリックした時の処理
  const handlePrev = async () => {
    const nextPage = page - 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  };
  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <img src="logo.png" alt="" className="logo" />
        </div>
      </div>
      {isLoading ? (
        <div className="loading">Now Loading...</div>
      ) : (
        <main>
          <div className="cards-container">
            {characters.map((character) => {
              return (
                <div className="card" key={character.id}>
                  <img
                    src={
                      character.images[0] != null
                        ? character.images[0]
                        : "dummy.png"
                    }
                    alt={character.name}
                    className="card-image"
                  />
                  <div className="card-content">
                    <h3 className="card-title">{character.name}</h3>
                    <p className="card-description">
                      {character.debut != null
                        ? character.debut.appearsIn
                        : "No Description"}
                    </p>
                    <div className="card-footer">
                      <span className="affiliation">
                        {character.personal != null
                          ? character.personal.affiliation
                          : "No Affiliation"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pager">
            <button className="prev" disabled={page === 1} onClick={handlePrev}>
              Prev
            </button>
            <span className="page-number">{page}</span>
            <button
              className="next"
              disabled={limit > characters.length}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;

import { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    fetchCharacters();
  }, []);

  //ここはじゃけいさん的コード
  // axios.get("https://narutodb.xyz/api/character").then((res) => {
  //   console.log(res.data);
  // });

  //ここはくるしばさんコード
  const fetchCharacters = async () => {
    const apiUrl = "https://narutodb.xyz/api/character";

    const result = await axios.get(apiUrl);
    console.log(result);
  };
  return <div className="App">hello world</div>;
}

export default App;

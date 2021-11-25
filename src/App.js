import logo from './logo.png';
import './App.css';
import  CharacterInfo from './components/CharacterInfo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
      </header>
      <CharacterInfo />
    </div>
  );
}

export default App;

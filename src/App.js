import Home from './components/Home/Home';
import houses from './Mocks/houses.json';
console.log(houses);
function App() {
  return (
    <div className="App">
      <h1>THIS IS APP</h1>
      <Home/>
    </div>
  );
}

export default App;

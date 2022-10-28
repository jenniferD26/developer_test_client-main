import People from '../People';
import Navigation from '../Navigation';
import Search from '../Search';

function App() {
  return (
    <div id='bg'>
    <Navigation />
      <div id='content'>
        <Search />
        <People />
      </div>
    </div>
  );
}

export default App;

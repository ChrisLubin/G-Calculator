import { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { getRandomCoords } from './functions';
import { Coordinate } from './types';
import { API_KEY } from './constants';

const ORLANDO_COORD = { lat: 28.538336, lng: -81.379234 };

function App() {
  const [coords] = useState<Coordinate[]>(getRandomCoords());
  const [coordsToShow, setCoordsToShow] = useState(0);

  const onSearchClick = () => {
    setInterval(() => {
      setCoordsToShow((currentCoordsShown) => currentCoordsShown + 5);
    }, 200);
  };

  return (
    <div className="App">
      <header className="App-header">
        <APIProvider apiKey={API_KEY}>
          <div style={{ marginBottom: '50px' }}>
            <TextField id="standard-basic" label="Address" variant="standard" style={{ width: '300px' }} disabled value="500 W Livingston St, Orlando, FL 32801" />
            <Button variant="outlined" style={{ marginTop: '12px', marginLeft: '20px', }} onClick={onSearchClick}>Search</Button>
          </div>
          <Map
            style={{ width: '100vw', height: '550px', marginBottom: '-60px' }}
            defaultCenter={ORLANDO_COORD}
            defaultZoom={10}
            gestureHandling={'greedy'}
          >
            {coords.map((coord, index) => (
              index <=  coordsToShow && <Marker key={coord.lat} position={coord} title="test" />
            ))}
          </Map>
        </APIProvider>
      </header>
    </div>
  );
}

export default App;

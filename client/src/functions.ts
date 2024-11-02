import { Coordinate } from './types';

const getRandomCoord: () => Coordinate = () => {
  const x1 = 28.7;
  const y1 = -81.54;
  const x2 = 28.34;
  const y2 = -81.25;

  const randomX = Math.random() * (x2 - x1) + x1;
  const randomY = Math.random() * (y2 - y1) + y1;

  return { lat: randomX, lng: randomY };
};

const getRandomCoords: () => Coordinate[] = () => {
  const coords: Coordinate[] = [];

  for (let i = 0; i < 50; i++) {
    coords.push(getRandomCoord());
  }

  return coords;
};

export { getRandomCoords };

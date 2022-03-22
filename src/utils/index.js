export  const getRandomCoords = () => {
  const min = 1;
  const max = 98;
  const right = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  const top = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [right, top]
}

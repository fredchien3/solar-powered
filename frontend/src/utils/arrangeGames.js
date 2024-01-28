// Arrange games randomly based on the date
export default function arrangeGames(games, seedMod) {
  let m = games.length, t, i;
  const now = new Date();
  let seed = `${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
  if (seedMod) seed += seedMod;

  while (m) {
    i = Math.floor(random(seed) * m--);
    t = games[m];
    games[m] = games[i];
    games[i] = t;
    seed++
  }
  return games;
}

function random(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
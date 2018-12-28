(function main() {
    updatePlayersList();
    document.getElementById('refresh').onclick = updatePlayersList;
  })();
  
async function updatePlayersList() {
  setNamesList([]);
  const kpqingPlayersNames = getKpqingPlayersNames(await getOnlinePlayers());
  setNamesList(kpqingPlayersNames);
}

async function getOnlinePlayers() {
  const requestUrl =
    'https://oldschoolmaple.com/api/v1/rankings?page=1&pageSize=1000&status=online&order=level&sort=desc';
  return fetch(requestUrl)
    .then(data => data.json())
    .then(res => res.result)
    .then(res => res.rankings);
}

function getKpqingPlayersNames(onlinePlayers) {
  const kpqMapName = '1st Accompaniment <Exit>';
  return onlinePlayers
    .filter(player => player.map.name === kpqMapName)
    .map(player => player.name);
}

function setNamesList(names) {
  const list = document.getElementById('players');
  list.innerHTML = names.map(name => `<li>${name}</li>`).join('');
}
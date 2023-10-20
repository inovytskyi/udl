import simulators from "./maps.json";

export const loadSimulators = () => {
  return simulators.map((item) => ({ name: item.name, image: item.image }));
};
export const loadMaps = (sim_name: string) => {
  return simulators
    .find((item) => item.name === sim_name)
    ?.maps.map((item) => ({ name: item.name, image: item.image }));
};
export const loadTracks = (map_name: string) => {
  return loadAllTracks()
    .filter((item) => item.map_name === map_name)
    .map((item) => ({ name: item.track_name, image: item.track_image }));
};

export const loadSingleTrack = (track_name: string) => {
  const res = loadAllTracks()
    .filter((item) => item.track_name === track_name)
    .map((item) => ({ name: item.track_name, image: item.track_image }));
  if (res) return res[0];
  else return undefined;
};

const loadAllTracks = () => {
  const data = [];
  for (const sim of simulators) {
    for (const map of sim.maps) {
      for (const track of map.tracks)
        data.push({
          track_name: track.name,
          track_image: track.image,
          map_name: map.name,
          map_image: map.image,
          sim_name: sim.name,
          sim_image: sim.image,
        });
    }
  }
  return data;
};

export const layers = {
  OpenStreetMap: {
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
  },
  OpenTopoMap: {
    name: "OpenTopoMap",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.opentopomap.org" target="_blank">OpenTopoMap</a>',
  },
  OpenHikingMap: {
    name: "OpenHikingMap",
    url: "https://maps.refuges.info/hiking/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://wiki.openstreetmap.org/wiki/Hiking/mri" target="_blank">sly</a>',
  },
  MapboxOutdoors: {
    name: "MapboxOutdoors",
    url: `https://api.mapbox.com/styles/v1/tprat/clnx5bdfi006c01qxbpei0xcg/tiles/256/{z}/{x}/{y}@2x?access_token=${
      import.meta.env.APP_MAPBOX_KEY
    }`,
    attribution:
      '&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
  },
  IGNClassique: {
    name: "IGNClassique",
    url: `https://wxs.ign.fr/${
      import.meta.env.APP_IGN_KEY
    }/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&TILEMATRIXSET=PM&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&FORMAT=image/jpeg&STYLE=normal`,
    attribution:
      "&copy; <a href='https://www.geoportail.gouv.fr/' target='_blank'>IGN</a>",
  },
};

// src/utils/networkStrings.js
// export const BASE_URL = "http://103.235.105.106:3000/api";
export const BASE_URL = "http://192.168.29.120:3000/api";

export const NetworkString = {
  MASJID_LIST: `${BASE_URL}/masjid/get`,
  MASJID_CREATE: `${BASE_URL}/masjid/create`,
  ISLAMICFEATURES_LIST: `${BASE_URL}/islamicevents/get`,
  ISLAMICFEATURES_CREATE: `${BASE_URL}/islamicevents/add`,
  GALLERY_LIST: `${BASE_URL}/gallery/gallery`,
  GALLERY_CREATE: `${BASE_URL}/gallery/addgallery`,
};

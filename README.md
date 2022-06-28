# SpotlightrDownloader
Easy way to download "Advanced HLS Encrypted videos" from www.spotlightr.com.

Permet de télécharger des vidéos chiffrées par jetons d'accès polymorphes depuis www.spotlightr.com.
## Fonctionnalitées

- trouver les urls des différents répertoires m3u8 a partir de celle de la vidéo
- télécharger asynchroniquement la vidéo

## Utilisation
Pour rechercher les répertoires liés aux vidéos :
```js
fetch_m3u8("video_url")
```
Pour télécharger, déchiffrer, concaténer un répertoire m3u8 :
```js
download_m3u8("m3u8_url", "destination_filepath")
```
## Exemple
Dernier exemple réalisé en juin 2022 sur [cette vidéo](https://docs.spotlightr.com/en/articles/1479379-video-content-security).
#### Recherche des répertoires
```js
fetch_m3u8("https://spotlightrteam.cdn.spotlightr.com/watch/NTU0NzI=")
```
```
https://1693712952.rsc.cdn77.org/101748/5af4138236e3e982903290-720-e.m3u8
https://1693712952.rsc.cdn77.org/101748/5af4138236e3e982903290-360-e.m3u8
```
#### Téléchargement de la vidéo
```js
download_m3u8("https://1693712952.rsc.cdn77.org/101748/5af4138236e3e982903290-720-e.m3u8", "./Aerial Shot Of Seascape.ts")
```
```
https://1693712952.rsc.cdn77.org/101748/5af4138236e3e982903290-720-e.m3u8
1 of 7 segment (14%) (105Ko/s)
2 of 7 segment (29%) (407Ko/s)
3 of 7 segment (43%) (784Ko/s)
4 of 7 segment (57%) (1188Ko/s)
5 of 7 segment (71%) (1634Ko/s)
6 of 7 segment (86%) (2152Ko/s)
7 of 7 segment (100%) (2653Ko/s)
Download complete : 4780Ko in 2s (avg 2651Ko/s)
```
## Dépendances
Version de node utilisée : `v15.5.0`
```json
{
  "dependencies": {
    "got": "^11.8.3",
    "m3u8-parser": "^4.7.0"
  }
}
```

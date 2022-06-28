const got = require('got').default;
const m3u8Parser = require('m3u8-parser');
const {decryptaes, decryptkey} = require('./decrypt')
const fs = require('fs');

class SegmentsDownloader {
    constructor(segments, base_url, on_loaded) {
        this.segments = segments;
        this.base_url = base_url;
        this.nloadedsegments = 0;
        this.nbitloaded = 0;
        this.on_loaded = on_loaded;
        this.response = new Array(segments.length);
   }

   on_segment_loaded(i, bytes) {
        this.nloadedsegments++;
        this.nbitloaded += bytes.byteLength;
        console.log(`${this.nloadedsegments} of ${this.segments.length} segment (${Math.round(this.nloadedsegments/this.segments.length*100)}%) (${Math.round(this.nbitloaded/(Date.now() - this.timestart))}Ko/s)`);
        this.response[i] = bytes;
        if (this.nloadedsegments == this.segments.length) {
            console.log(`Download complete : ${Math.round(this.nbitloaded/1000)}Ko in ${Math.round((Date.now() - this.timestart)/1000)}s (avg ${Math.round(this.nbitloaded/(Date.now() - this.timestart))}Ko/s)`)
            this.on_loaded(this.response);
        }
   }

   async download_segment(i) {
        let key = await download_key(`${this.base_url}/${this.segments[i].key.uri}`);
        let encrypted_ts = await got(`${this.base_url}/${this.segments[i].uri}`);
        return decryptaes({
            encrypted:  encrypted_ts.rawBody, 
            key: key,
            iv: this.segments[i].key.iv
        }, this, i)
   }

   async startdownload() {
        this.timestart = Date.now();
        for (let i=0;i<this.segments.length;i++) {
            this.download_segment(i);
        }
   }

}

function concat(arrays) {
    let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
  
    if (!arrays.length) return null;
     let result = new Uint8Array(totalLength);
        let length = 0;
        for(let array of arrays) {
              result.set(array, length);
              length += array.length;
        } 
        return result;
}

async function download_key(url) {
    let encrypted_key = await got(url);
    return decryptkey(encrypted_key.rawBody)
}

async function download_m3u8(url, path) {

    async function store_file(segments_byte_list) {
        let combined = concat(segments_byte_list);
        buffer = Buffer.from(combined)
        fs.createWriteStream(path).write(buffer);
    }

    let raw_m3u8_response = await got(url);
    
    let base_url = url.split('/');
    base_url.pop();
    base_url = base_url.join("/");

    var parser = new m3u8Parser.Parser();
    parser.push(raw_m3u8_response.body);
    parser.end();

    let handler = new SegmentsDownloader(parser.manifest.segments, base_url, store_file);
    await handler.startdownload();
}


async function fetch_m3u8(spotlightr_url) {
    const videoid = Buffer.from(spotlightr_url.split('/').pop(), 'base64').toString('ascii');
    const domain = spotlightr_url.split('/')[2];
    const api_url = `https://api.spotlightr.com/video/playerSettings?videoID=${videoid}&browser=Chrome&device=Desktop&cookie=ojkc6glikvopmpqlomn8&domain=${domain}&omitViewGenerate=false`

    let raw_api_response = await got(api_url);
    let json_api_response = JSON.parse(raw_api_response.body);

    let base_url = json_api_response.insertView.video.URL.split('/');
    base_url.pop();
    base_url = base_url.join("/");

    let raw_m3u8_playlist_response = await got(json_api_response.insertView.video.URL);

    var parser = new m3u8Parser.Parser();
    parser.push(raw_m3u8_playlist_response.body);
    parser.end();

    for (let i=0;i<parser.manifest.playlists.length;i++) {
        console.log(`${base_url}/${parser.manifest.playlists[i].uri}`);
    }   
}

//Exemple du github
//fetch_m3u8("https://spotlightrteam.cdn.spotlightr.com/watch/NTU0NzI=");
//download_m3u8("https://1693712952.rsc.cdn77.org/101748/5af4138236e3e982903290-720-e.m3u8", "./Aerial Shot Of Seascape.ts");

module.exports = {fetch_m3u8, download_m3u8}
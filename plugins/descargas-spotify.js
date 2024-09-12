import fetch from 'node-fetch';
import fs from 'fs';
import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.descargas_spotify

 if (!text) throw `${tradutor.texto1} _${usedPrefix + command} Good Feeling - Flo Rida_`;
  try {
    const res = await fetch(`${global.MyApiRestBaseUrl}/api/spotifysearch?text=${text}&apikey=${global.MyApiRestApikey}`);
    const data = await res.json()
    const linkDL = data?.spty?.resultado[0]?.url || data?.spty?.resultado[0]?.link;
    const musics = await fetch(`${global.MyApiRestBaseUrl}/api/spotifydl?text=${linkDL}&apikey=${global.MyApiRestApikey}`);
    const music = await conn.getFile(musics?.url)
    const infos = await fetch(`${global.MyApiRestBaseUrl}/api/spotifyinfo?text=${linkDL}&apikey=${global.MyApiRestApikey}`);
    const info = await infos.json()
    const spty = info?.spty?.resultado
    const img = await (await fetch(`${spty.thumbnail}`)).buffer()  
    let spotifyi = ` _${tradutor.texto2[0]}_\n\n`
        spotifyi += ` ${tradutor.texto2[1]} ${spty.title}\n`
        spotifyi += ` ${tradutor.texto2[2]} ${spty.artist}\n`
        spotifyi += ` ${tradutor.texto2[3]} ${spty.album}\n`                 
        spotifyi += ` ${tradutor.texto2[4]} ${spty.year}\n\n`   
        spotifyi += `> ${tradutor.texto2[5]}`
    await conn.sendMessage(m.chat, {text: spotifyi.trim(), contextInfo: {forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.titulowm2, "containsAutoReply": true, "mediaType": 1, "thumbnail": img, "thumbnailUrl": img, "mediaUrl": linkDL, "sourceUrl": linkDL}}}, {quoted: m});
    await conn.sendMessage(m.chat, {audio: music.data, fileName: `${spty.name}.mp3`, mimetype: 'audio/mpeg'}, {quoted: m});
  } catch (error) {
    console.error('Error: ' + error.message);
    throw tradutor.texto3;
  }
};
handler.command = /^(spotify|music)$/i;
export default handler;
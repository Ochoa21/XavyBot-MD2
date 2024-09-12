import {googleImage} from '@bochilteam/scraper';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.downloader_imagen


  if (!text) throw `${tradutor.texto1} ${usedPrefix + command} Minecraft*`;
  const res = await googleImage(text);
  const image = await res.getRandom();
  const link = image;
    conn.sendFile(m.chat, link, 'error.jpg', `${tradutor.texto2[0]} ${text}\n${tradutor.texto2[1]} ${link}\n${tradutor.texto2[2]}`, m);
};
handler.help = ['gimage <query>', 'imagen <query>'];
handler.tags = ['internet', 'tools'];
handler.command = /^(gimage|image|imagen)$/i;
export default handler;
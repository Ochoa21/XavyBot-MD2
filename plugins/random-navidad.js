import axios from 'axios';


const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command,
}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.random_navidad

  const res = (await axios.get(`https://raw.githubusercontent.com/Ochoa21/XavyBot-MD/master/src/JSON/navidad.json`)).data;
  const ochoa = await res[Math.floor(res.length * Math.random())];
  conn.sendMessage(m.chat, {
    image: {
      url: ochoa,
    },
    caption: tradutor.texto1,
  }, {
    quoted: m,
  });
};
handler.help = ['navidad'];
handler.tags = ['internet'];
handler.command = /^(navidad)$/i;
export default handler;

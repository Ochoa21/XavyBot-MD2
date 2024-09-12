import axios from 'axios';
const handler = async (m, {conn, args, usedPrefix, command}) => {
  const res = (await axios.get(`https://raw.githubusercontent.com/Ochoa21/XavyBot-MD/master/src/JSON/itzy.json`)).data;
  const ochoa = await res[Math.floor(res.length * Math.random())];
  conn.sendFile(m.chat, ochoa, 'error.jpg', `_${command}_`, m);
};
handler.help = ['itzy', 'kpopitzy'];
handler.tags = ['internet'];
handler.command = /^(itzy|kpopitzy)$/i;
export default handler;

const handler = async (m, { conn, isROwner, text }) => {
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const tradutor = _translate.plugins.owner_off;
  
    if (!process.send) throw tradutor.texto1;
    await m.reply(tradutor.texto2);
    process.send('exit'); // Cambia 'reset' a 'exit' para apagar el bot
  };
  
  handler.help = ['off'];
  handler.tags = ['owner'];
  handler.command = ['off'];
  handler.rowner = true;
  
  export default handler;
  
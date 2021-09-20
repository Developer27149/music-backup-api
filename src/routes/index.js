const router = require('koa-router')();
const { user_cloud, song_url } = require('NeteaseCloudMusicApi'); // eslint-disable-line
const cookieGenerator = require('../init');

router.get('/test', async (ctx) => {
  ctx.body = 'test...';
});

router.get('/song/:id', async (ctx) => {
  const getData = async () => {
    const res = await song_url({
      id: ctx.params.id,
      cookie: globalThis.cookie,
    });
    return res;
  };
  let res = await getData();
  if (res.body.data[0].code !== 200) {
    await cookieGenerator();
    res = await getData(); // update cookie and try again
  } else {
    ctx.body = { url: res.body.data[0].url || '' };
  }
});

router.get('/songs', async (ctx) => {
  const getData = async () => {
    const res = await user_cloud({
      cookie: globalThis.cookie,
    });
    const result = await Promise.all(
      res.body.data.map((song) => {
        const id = song.songId;
        return song_url({ id, cookie: globalThis.cookie });
      })
    );
    return { res, result };
  };
  const { res, result } = await getData();
  ctx.body = {
    data: result.map((item, idx) => {
      const { songId, songName, artist } = res.body.data[idx];
      const { picUrl } = res.body.data[idx].simpleSong.al;
      const { url } = item.body.data[0];
      return {
        songId,
        songName,
        artist,
        url,
        picUrl,
      };
    }),
  };
});

module.exports = router;

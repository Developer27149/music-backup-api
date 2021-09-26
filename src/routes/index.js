const router = require('koa-router')();
const { user_cloud, song_url } = require('NeteaseCloudMusicApi'); // eslint-disable-line
const cookieGenerator = require('../init');
const { default: shouldGetNewData } = require('../lib');

router.get('/test', async (ctx) => {
  ctx.body = 'test...';
});

router.get('/song/:id', async (ctx) => {
  const { id } = ctx.params;
  if (shouldGetNewData() || id !== globalThis?.id) {
    const getData = async () => {
      const res = await song_url({
        id,
        cookie: globalThis.cookie,
      });
      return res;
    };
    let res = await getData();
    if (res.body.data[0].code !== 200) {
      await cookieGenerator();
      res = await getData(); // update cookie and try again
    } else {
      globalThis.id = id;
      globalThis.date = new Date().getTime();
      globalThis.song = res.body.data[0].url;
      ctx.body = { url: res.body.data[0].url || '' };
    }
  } else {
    ctx.body = {
      url: globalThis.song,
    };
  }
});

router.get('/songs', async (ctx) => {
  if (shouldGetNewData()) {
    globalThis.date = new Date().getTime();
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
    const data = result.map((item, idx) => {
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
    });
    globalThis.songs = data;
    ctx.body = {
      data,
    };
  } else {
    ctx.body = {
      data: globalThis.songs,
    };
  }
});

module.exports = router;

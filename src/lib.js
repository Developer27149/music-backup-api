function shouldGetNewData() {
  const date = new Date().getTime();
  return (
    globalThis?.date === undefined ||
    globalThis.date > date - 1000 * 60 * 60 * 24
  );
}

module.exports = shouldGetNewData;

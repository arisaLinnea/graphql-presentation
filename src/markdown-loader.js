module.exports = function(source) {
  const regex = new RegExp('(?<=```)(.*?)(?=```)', 'sg');
  const matches = source.match(regex);
  if (matches) {
    matches.forEach((m) => {
      source = source.replace(
        m,
        m.replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
      );
    });
  }

  return source;
}

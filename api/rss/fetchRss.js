const Parser = require('rss-parser');

const parser = new Parser()
const RSS_URL = 'http://feeds.bbci.co.uk/news/rss.xml';

const fetchRss = async () => {
  const feed = await parser.parseURL(RSS_URL);
  const items = feed.items.map(item => ({
    title: item.title,
    link: item.link,
    description: item.contentSnippet || item.description,
    pubDate: item.pubDate
  }));
  return items;
};

module.exports = fetchRss;
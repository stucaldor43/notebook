import algoliasearch from 'algoliasearch';
const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_ADMIN_KEY);

exports.handler = async function (event, context) {
  const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);
  index.saveObject({
    objectID: "4kaj",
    title: "First Post",
    body: "Some text"
  });

  return {
    statusCode: 200,
    body: "Success"
  };
}
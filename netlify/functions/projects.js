// Netlify Function: proxies Drupal JSON:API for same-origin access
const DRUPAL_API_URL = process.env.DRUPAL_API_URL ||
  'https://cms.andrewjbarker.com/jsonapi/node/projects?include=field_project_image.field_media_image,field_skills.field_logo,uid';

exports.handler = async (event) => {
  try {
    const resp = await fetch(DRUPAL_API_URL, {
      headers: { Accept: 'application/vnd.api+json' }
    });
    const body = await resp.text();

    return {
      statusCode: resp.ok ? 200 : 502,
      headers: { 'Content-Type': 'application/json' },
      body
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to fetch Drupal', details: err.message })
    };
  }
};

// Netlify Function: fetches Drupal JSON:API and returns a transformed project array
const DRUPAL_API_URL = process.env.DRUPAL_API_URL ||
  'https://cms.andrewjbarker.com/jsonapi/node/projects?include=field_project_image.field_media_image,field_skills,uid';

// Map Drupal JSON:API response to app project shape
function mapDrupalResponse(data = [], included = []) {
  const includedById = Object.fromEntries((included || []).map((i) => [i.id, i]));

  return (data || []).map((item) => {
    const attrs = item.attributes || {};
    const rel = item.relationships || {};

    // Resolve image via media -> file
    let imageUrl = null;
    const imageRelId = rel.field_project_image?.data?.id;
    const imageIncluded = imageRelId && includedById[imageRelId];
    if (imageIncluded) {
      const fileRelId = imageIncluded.relationships?.field_media_image?.data?.id;
      const fileIncluded = fileRelId && includedById[fileRelId];
      imageUrl =
        fileIncluded?.attributes?.uri?.url ||
        fileIncluded?.attributes?.uri?.value ||
        imageIncluded.attributes?.field_media_image?.uri?.url ||
        imageIncluded.attributes?.uri?.url ||
        null;
    }

    // Resolve skills
    const skills = (rel.field_skills?.data || []).map((s) => {
      const inc = includedById[s.id] || {};
      let logo = null;
      // Try a few possible relationship/field names that may hold the media
      const possibleLogoRels = ['field_logo', 'field_skill_icon', 'field_skill_image', 'field_icon'];
      let mediaIncluded = null;
      for (const relName of possibleLogoRels) {
        const logoMediaId = inc.relationships?.[relName]?.data?.id;
        if (logoMediaId && includedById[logoMediaId]) {
          mediaIncluded = includedById[logoMediaId];
          break;
        }
      }
      if (mediaIncluded) {
        // Follow media -> file (field_media_image or field_media_image)
        const fileRelId = mediaIncluded.relationships?.field_media_image?.data?.id || mediaIncluded.relationships?.field_media_file?.data?.id || mediaIncluded.relationships?.field_media_image?.data?.id;
        const fileIncluded = fileRelId && includedById[fileRelId];
        logo = fileIncluded?.attributes?.uri?.url || fileIncluded?.attributes?.uri?.value || mediaIncluded.attributes?.field_media_image?.uri?.url || mediaIncluded.attributes?.uri?.url || null;
      } else {
        // Fallback to any direct attribute that might contain a URI
        logo = inc.attributes?.field_logo?.uri?.url || inc.attributes?.logo?.uri?.url || inc.attributes?.field_skill_icon?.uri?.url || null;
      }

      return {
        id: s.id || inc.id || Math.random().toString(36).slice(2, 9),
        name: inc.attributes?.name || inc.attributes?.title || s.meta?.drupal_internal__target_id || "",
        logo
      };
    });

    return {
      id: item.id || attrs.drupal_internal__nid || Math.random().toString(36).slice(2, 9),
      title: attrs.title || attrs.field_title || "",
      content: attrs.field_description || attrs.body || "",
      url: attrs.field_project_link?.uri || (attrs.field_project_link?.url || null),
      image: imageUrl,
      skills
    };
  });
}

exports.handler = async (event) => {
  try {
    const resp = await fetch(DRUPAL_API_URL, {
      headers: { Accept: 'application/vnd.api+json' },
      timeout: 10000
    });

    if (!resp.ok) {
      const text = await resp.text();
      return { statusCode: 502, body: JSON.stringify({ error: 'Bad response from Drupal', status: resp.status, body: text }) };
    }

    const json = await resp.json();
    const projects = mapDrupalResponse(json.data || [], json.included || []);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projects)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to fetch/transform Drupal', details: err.message })
    };
  }
};

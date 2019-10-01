
// Exposed url by ngRok to change at each run of the ngRock
const proxyUrl = 'https://0875cc87.ngrok.io/api/v1'

export const environment = {

  production: true,

  users_api_url: `${proxyUrl}/users`,
  users_api_backend_type: 'java',

  educational_institution_url: `${proxyUrl}/establishments`,
  educational_institution_api_backend_type: 'java',

  level_url: `${proxyUrl}/levels`,
  level_url_api_backend_type: 'java',

  field_url: `${proxyUrl}/fields`,
  field_url_api_backend_type: 'java',

  classe_url: `${proxyUrl}/classes`,
  classe_url_api_backend_type: 'java',

  course_url: `${proxyUrl}/courses`,
  course_url_api_backend_type: 'java',

  library_url: `${proxyUrl}/library`,
  library_url_api_backend_type: 'java',

  webSocket_url: `${proxyUrl}/socket`,
  webSocket_url_api_backend_type: 'java',

  group_url: `${proxyUrl}/groups`,
  group_url_api_backend_type: 'java',

  post_url: `${proxyUrl}/posts`,
  post_url_api_backend_type: 'java',

  comment_url: `${proxyUrl}/comments`,
  comment_url_api_backend_type: 'java',

  like_url: `${proxyUrl}/likes`,
  like_url_api_backend_type: 'java',

  /** Environment platform name */
  name: 'Prod',

  /** Activate Logs */
  log: 'true'
};

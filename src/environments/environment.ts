// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /** Environment platform name */
  name: 'dev',
  /** Activate Logs */
  log: 'true',

  users_api_url: 'http://localhost:8080/api/v1/users',
  users_api_backend_type: 'java',

  educational_institution_url: 'http://localhost:8080/api/v1/establishments',
  educational_institution_api_backend_type: 'java',

  level_url: 'http://localhost:8080/api/v1/levels',
  level_url_api_backend_type: 'java',

  field_url: 'http://localhost:8080/api/v1/fields',
  field_url_api_backend_type: 'java',

  classe_url: 'http://localhost:8080/api/v1/classes',
  classe_url_api_backend_type: 'java',

  course_url: 'http://localhost:8080/api/v1/courses',
  course_url_api_backend_type: 'java',

  library_url: 'http://localhost:8080/api/v1/library',
  library_url_api_backend_type: 'java',

  webSocket_url: 'http://localhost:8080/api/v1/socket',
  webSocket_url_api_backend_type: 'java',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

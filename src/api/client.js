/* global XMLHttpRequest Headers */
import rp from 'request-promise';

// Module configuration
const config = {
  baseUrl: '',
  headers: {},
  json: false,
  queryString: {},
};

// Construct URL for request
const url = path => `${config.baseUrl}/${path}`;

/**
 * Perform FETCH request
 * @param string path Endpoint URL
 * @param object options Request options
 * @return Promise
 */
const makeRequest = (method, path, options) => {
  const headers = {
    ...config.headers,
    ...options.headers,
  };

  return rp({
    headers,
    method,
    uri: url(path),
    json: config.json,
  });

  // const options = {
  //   uri: url(uri),
  //   ...opts,
  // }

  // const { accessToken, body, headers: _headers, ...opts } = options;
  //
  // /**
  //  * Build request headers
  //  */
  // const headers = new Headers(_headers);
  //
  // if (!headers.has('Content-Type')) {
  //   headers.append('Content-Type', 'application/json');
  // }
  //
  // if (!headers.has('Authorization') && accessToken) {
  //   headers.append('Authorization', `Bearer ${accessToken}`);
  // } else if (!headers.has('Authorization') && config.accessToken) {
  //   headers.append('Authorization', `Bearer ${config.accessToken}`);
  // }
  //
  // /**
  //  * Send request
  //  */
  // return fetch(url(path), {
  //   ...opts,
  //   headers,
  //   // TODO set body based on Content-Type header
  //   body: body ? JSON.stringify(body) : undefined,
  // });
};

// Client helper
export default function client(method, path, options) {
  return makeRequest(method, path, options);
}

/**
 * Update Module configuration
 */
client.setBaseUrl = function setBaseUrl(baseUrl) {
  config.baseUrl = baseUrl;
};

client.setHeaders = function setHeaders(headers) {
  config.headers = headers;
};

client.setQueryString = function setQueryString(stringObject) {
  return Object
    .entries(stringObject).map(([key, value]) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    ).join('&');
};

client.enableJsonMode = function enableJsonMode() {
  config.json = true;
};

client.disableJsonMode = function disableJsonMode() {
  config.json = false;
};

// /**
//  * Execute GET request
//  */
// client.get = (path, options = {}) => makeRequest(path, {
//   method: 'GET',
//   ...options,
// });
//
// /**
//  * Execute POST request
//  */
// client.post = (path, options = {}) => makeRequest(path, {
//   method: 'POST',
//   ...options,
// });
//
// /**
//  * Execute PUT request
//  */
// client.put = (path, options = {}) => makeRequest(path, {
//   method: 'PUT',
//   ...options,
// });
//
// /**
//  * Execute DELETE request
//  */
// client.del = (path, options = {}) => makeRequest(path, {
//   method: 'DELETE',
//   ...options,
// });

export default async function csrfFetch(url, options = {}) {
  options.headers ||= {};
  options.method ||= 'GET';

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] ||= 'application/json';
    options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
  }
  
  const res = await fetch(url, options);
  if (res.status >= 400) throw res;
  return res;
}

export async function restoreCSRF() {
  const res = await csrfFetch('/api/session');
  storeCSRFToken(res)
  return res;
}

export function storeCSRFToken(res) {
  const token = res.headers.get('X-CSRF-Token');
  if (token) sessionStorage.setItem('X-CSRF-Token', token);
}
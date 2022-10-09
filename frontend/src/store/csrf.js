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
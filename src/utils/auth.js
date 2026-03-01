export function parseJwt(token){
  try{const p=token.split('.')[1];return JSON.parse(atob(p));}catch(e){return null}
}

export function setToken(token){
  if(!token) return;
  localStorage.setItem('token', token);
  const payload = parseJwt(token);
  const role = payload && payload.isAdmin ? 'admin' : 'user';
  localStorage.setItem('role', role);
}

export function clearAuth(){
  localStorage.removeItem('token');
  localStorage.setItem('role','guest');
}

export function getRole(){
  return localStorage.getItem('role') || 'guest';
}

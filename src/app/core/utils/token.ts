export function isTokenExpired(token: string) {
  const exp: number = deserializeToken(token).exp;
  const expired = exp - Date.now() / 1000 <= 0;

  return expired;
}

export function deserializeToken(token: string): Record<string, any> {
  const [, body] = token.split('.');
  // decoding base64 ⇢ UTF8
  return JSON.parse(
    decodeURIComponent(
      atob(body)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    ),
  );
}

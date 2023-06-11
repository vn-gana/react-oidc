import base64Enc from 'crypto-js/enc-base64';
import utf8Enc from 'crypto-js/enc-utf8';
import SHA256 from 'crypto-js/sha256';

const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const bufferToString = (buffer: Uint8Array) => {
  const state = [];
  for (let i = 0; i < buffer.byteLength; i += 1) {
    const index = buffer[i] % charset.length;
    state.push(charset[index]);
  }
  return state.join('');
};
export const generateRandom = (size: number) => {
    const buffer = new Uint8Array(size);
    for (let i = 0; i < size; i += 1) {
      buffer[i] = (Math.random() * charset.length) | 0;
    }
    return bufferToString(buffer);
  };

  export const deriveChallengeAsync = (code: string): Promise<string> => {
    if (code.length < 43 || code.length > 128) {
      return Promise.reject(new Error('Invalid code length.'));
    }
    const hash = SHA256(utf8Enc.parse(code));
    const hashInBase64 = base64Enc.stringify(hash);
    const urlSafeHash = hashInBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return Promise.resolve(urlSafeHash);
};

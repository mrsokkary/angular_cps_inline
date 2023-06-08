export function generateRandomNonce(): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nonce = '';
    for (let i = 0; i < 16; i++) {
      nonce += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return nonce;
  }
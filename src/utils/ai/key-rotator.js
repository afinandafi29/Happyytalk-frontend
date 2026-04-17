
export class KeyRotator {
  constructor(keysString) {
    this.keys = (keysString || '').split(',').map(k => k.trim()).filter(k => k.length > 0);
    this.currentIndex = 0;
  }

  getCurrentKey() {
    if (this.keys.length === 0) return null;
    return this.keys[this.currentIndex];
  }

  rotate() {
    if (this.keys.length <= 1) return this.getCurrentKey();
    this.currentIndex = (this.currentIndex + 1) % this.keys.length;
    return this.getCurrentKey();
  }

  getKeyCount() {
    return this.keys.length;
  }
}

export const githubRotator = new KeyRotator(import.meta.env.VITE_GITHUB_AI_TOKEN || '');
export const openaiRotator = new KeyRotator(import.meta.env.VITE_OPENAI_API_KEY || '');

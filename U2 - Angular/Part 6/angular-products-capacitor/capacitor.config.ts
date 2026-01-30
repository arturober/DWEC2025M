import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.arturo.products',
  appName: 'Angular Products',
  webDir: 'dist/angular-products/browser',
  android: {
    allowMixedContent: true
  },
  plugins: {
    SystemBars: {
      "insetsHandling": "disable"
    }
  }
};

export default config;

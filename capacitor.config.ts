import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.gov.jharkhand.bhashasetu',
  appName: 'BhashaSetu',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: "#1E3A8A",
      showSpinner: false
    }
  }
};

export default config;

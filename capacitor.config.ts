import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.taskmanager',
  appName: 'taskmanager',
  webDir: 'dist',
  bundledWebRuntime: false,
	server: {
		url: 'http://192.168.68.107:8100',
		cleartext: true
	}
};

export default config;

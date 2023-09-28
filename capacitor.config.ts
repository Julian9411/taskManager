import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.taskmanager',
  appName: 'taskmanager',
  webDir: 'dist',
  bundledWebRuntime: false,
	server: {
		url: 'http://192.168.10.11:8101',
		cleartext: true
	}
};

export default config;

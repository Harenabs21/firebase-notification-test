import 'dotenv/config';

export default {

    expo: {
            name: 'firebase-notification-test',
            slug: 'firebase-notification-test',
            version: '1.0.0',
            orientation: 'portrait',
            icon: './assets/images/icon.png',
            scheme: 'myapp',
            userInterfaceStyle: 'automatic',
            newArchEnabled: true,
            ios: {
                supportsTablet: true,
            },
            android: {
                adaptiveIcon: {
                    foregroundImage: './assets/images/adaptive-icon.png',
                        backgroundColor: '#ffffff',
                },
                package: process.env.ANDROID_PACKAGE_NAME,
                googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
            },
            web: {
                bundler: 'metro',
                output: 'static',
                favicon: './assets/images/favicon.png',
            },
            plugins: [
                'expo-router',
                [
                    'expo-splash-screen',
                    {
                        image: './assets/images/splash-icon.png',
                        imageWidth: 200,
                        resizeMode: 'contain',
                        backgroundColor: '#ffffff',
                    },
                ],
            ],
            experiments: {
                typedRoutes: true,
            },
            extra: {
                router: {
                    origin: false,
                },
                eas: {
                    projectId: '182dadfe-f0e6-4317-a87c-c559980a7932',
                },
            },
    },
};

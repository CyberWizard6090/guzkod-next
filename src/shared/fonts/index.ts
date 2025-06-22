import localFont from 'next/font/local';

export const inter = localFont({
  src: [
    { path: '../assets/fonts/Inter/Inter-Thin.otf', weight: '100', style: 'normal' },
    { path: '../assets/fonts/Inter/Inter-ThinItalic.otf', weight: '100', style: 'italic' },
    { path: '../assets/fonts/Inter/Inter-ExtraLight.otf', weight: '200', style: 'normal' },
    { path: '../assets/fonts/Inter/Inter-ExtraLightItalic.otf', weight: '200', style: 'italic' },
    { path: '../assets/fonts/Inter/Inter-Light.otf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/Inter/Inter-LightItalic.otf', weight: '300', style: 'italic' },
    { path: '../assets/fonts/Inter/Inter-Regular.otf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/Inter/Inter-Italic.otf', weight: '400', style: 'italic' },
    { path: '../assets/fonts/Inter/Inter-Medium.otf', weight: '500', style: 'normal' },
    { path: '../assets/fonts/Inter/Inter-MediumItalic.otf', weight: '500', style: 'italic' },
    { path: '../assets/fonts/Inter/Inter-SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../assets/fonts/Inter/Inter-SemiBoldItalic.otf', weight: '600', style: 'italic' },
    { path: '../assets/fonts/Inter/Inter-Bold.otf', weight: '700', style: 'normal' },
    { path: '../assets/fonts/Inter/Inter-BoldItalic.otf', weight: '700', style: 'italic' },
    { path: '../assets/fonts/Inter/Inter-ExtraBold.otf', weight: '800', style: 'normal' },
    { path: '../assets/fonts/Inter/Inter-ExtraBoldItalic.otf', weight: '800', style: 'italic' },
    { path: '../assets/fonts/Inter/Inter-Black.otf', weight: '900', style: 'normal' },
    { path: '../assets/fonts/Inter/Inter-BlackItalic.otf', weight: '900', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-inter',
});

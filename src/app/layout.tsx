import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuroraBackground } from '@/components/ui/aurora-background';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSansArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });

export const metadata: Metadata = {
    title: 'Dr. Karim Cherti — Dermatologue · Larache, Maroc',
    description: "Cabinet de dermatologie à Larache. Peau, ongles, MST, Laser, Botox, PRP, Peeling. Diplômé Paris. عيادة أمراض الجلد بالعرائش. جلد، أظافر، أمراض تناسلية، ليزر، بوتوكس، PRP. خريج باريس.",
    icons: {
        icon: '/Logo.png',
        apple: '/Logo.png',
    },
    alternates: {
        languages: {
            'fr': '/fr',
            'ar': '/ar',
            'x-default': '/',
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" dir="ltr" data-theme="light">
            <body className={`${inter.variable} ${notoSansArabic.variable} font-sans antialiased overflow-x-hidden relative bg-transparent dark:bg-transparent`}>
                <LanguageProvider>
                    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
                        <AuroraBackground className="min-h-screen">
                            <Navbar />
                            <main className="w-full flex-grow flex flex-col pt-0 relative z-10">
                                {children}
                            </main>
                        </AuroraBackground>
                    </ThemeProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}

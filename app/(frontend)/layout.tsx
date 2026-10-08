import BackButton from "@/components/layout/BackButton";
import Navbar from "@/components/layout/Navbar";
import { Bricolage_Grotesque } from 'next/font/google';

const displayFont = Bricolage_Grotesque({
  variable: '--font-portfolio-display',
  subsets: ['latin'],
  display: 'swap',
});

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${displayFont.variable} portfolio-shell`}>
      <a href="#main-content" className="portfolio-skip-link">Skip to content</a>
      <Navbar displayFontClassName={displayFont.variable} />
      <BackButton />
      <div id="main-content" tabIndex={-1} className="portfolio-content">
        {children}
      </div>
    </div>
  );
}

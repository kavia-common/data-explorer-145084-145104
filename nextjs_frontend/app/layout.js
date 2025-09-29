import "./globals.css";

export const metadata = {
  title: "Data Explorer",
  description: "Minimal, classic data explorer with a sidebar and table view (Ocean Professional theme).",
};

/**
 * Root layout for the Next.js app. Applies global styles and sets base structure.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

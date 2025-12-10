import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var cookies = document.cookie.split('; ');
                  var themeCookie = cookies.find(function(row) { return row.startsWith('theme='); });
                  if (themeCookie) {
                    var theme = themeCookie.split('=')[1];
                    document.documentElement.setAttribute('data-theme', theme);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'default');
                  }
                } catch (e) {
                  console.error('Error setting theme from cookie:', e);
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

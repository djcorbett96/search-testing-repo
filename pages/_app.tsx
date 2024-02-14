import {
  HeadlessConfig,
  SearchHeadlessProvider,
  provideHeadless,
} from '@yext/search-headless-react';
import '../styles/globals.css';

// const config: HeadlessConfig = {
//   apiKey: 'b083465ee2ad3d23460e150c6a297f7f',
//   experienceKey: 'dj-master',
//   experienceVersion: 'PRODUCTION',
//   locale: 'en',
//   verticalKey: 'products',
// };

const config: HeadlessConfig = {
  apiKey: 'b083465ee2ad3d23460e150c6a297f7f',
  experienceKey: 'dj-master',
  experienceVersion: 'STAGING',
  locale: 'en',
  // verticalKey: 'help_articles',
};

function MyApp({ Component, pageProps }) {
  const searcher = provideHeadless(config);
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <Component {...pageProps} />
    </SearchHeadlessProvider>
  );
}

export default MyApp;

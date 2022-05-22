import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Footer from './components/Footer';
import Header from './components/Header';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: PingFangTC;
    src: url('/PingFang-TC-Regular-2.otf') format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: PingFangTC;
    src: url('/PingFang-TC-Thin-2.otf') format('opentype');
    font-weight: 100;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url('/NotoSansTC-Regular.otf') format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url('/NotoSansTC-Bold.otf') format('opentype');
    font-weight: bold;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: NotoSansTC;
  }

  #root {
    min-height: 100vh;
    padding: 140px 0 115px;
    position: relative;

    @media screen and (max-width: 1279px) {
      padding: 102px 0 208px;
    }
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

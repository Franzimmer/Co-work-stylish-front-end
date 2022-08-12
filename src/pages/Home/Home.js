import styled from "styled-components";
import Carousel from "./Carousel";
import Products from "./Products";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import ReactHlsPlayer from "react-hls-player";

const Video = styled.div`
  margin: 0 auto;
  width: 800px;
  margin-top: 50px;
  background: #ffe4c9;
  padding: 50px;
  border-radius: 15px;
`;

const VideoInput = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
  display: flex;
  align-item: center;
  color: brown;
`;

const VideoLive = styled.div`
  width: 15px;
  height: 15px;
  background: red;
  border-radius: 50%;
  margin-left: 5px;
  margin-top: 8px;
`;

const VideoLove = styled.div`
  margin-left: auto;
  margin-right: 20px;
`;

const VideoNice = styled.div`
  margin-right: 20px;
`;

const VideoSuck = styled.div``;

function Home() {
  const [hlsUrl, setHlsUrl] = useState(
    "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
  );

  return (
    <>
      <Carousel />
      <Products />
    </>
  );
}

export default Home;

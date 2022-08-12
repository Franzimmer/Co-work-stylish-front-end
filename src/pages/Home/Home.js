import styled from 'styled-components';
import Carousel from './Carousel';
import Products from './Products';
import personhead from './personhead.png';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import ReactHlsPlayer from 'react-hls-player';

const Person = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  padding-top: 30px;
  @media screen and (max-width: 1279px) {
    width: 170px;
    padding-top: 20px;
  }
`;

const PersonHead = styled.div`
  width: 50px;
  height: 50px;
  ${'' /* background: white; */}
  border-radius: 50%;
  background-image: url(${personhead});
  background-repeat: no-repeat;
  background-size: 100%;
  @media screen and (max-width: 1279px) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

const PersonName = styled.div`
  font-size: 30px;
  letter-spacing: 7px;
  @media screen and (max-width: 1279px) {
    font-size: 20px;
    letter-spacing: 5px;
  }
`;

const LiveCheck = styled.div`
  width: 15px;
  height: 15px;
  background: red;
  border-radius: 50%;
  @media screen and (max-width: 1279px) {
    width: 7px;
    height: 7px;
  }
`;

const TrackButton = styled.div`
  font-size: 40px;
  @media screen and (max-width: 1279px) {
    font-size: 30px;
  }
`;

const Tracked = styled.div`
  font-size: 30px;
  padding-top: 40px;
  letter-spacing: 7px;
  color: brown;
  @media screen and (max-width: 1279px) {
    font-size: 25px;
    padding-top: 30px;
    color: brown;
  }
`;

const UnTracked = styled.div`
  font-size: 30px;
  padding-top: 60px;
  letter-spacing: 7px;
  color: brown;
  @media screen and (max-width: 1279px) {
    font-size: 25px;
    padding-top: 40px;
    color: brown;
  }
`;

const Messages = styled.div`
  width: 100%;
  font-size: 25px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  @media screen and (max-width: 1279px) {
    font-size: 20px;
    letter-spacing: 5px;
  }
`;

const MessagesUnread = styled.div`
  width: 15px;
  height: 15px;
  background: #ff8c69;
  border-radius: 50%;
  @media screen and (max-width: 1279px) {
    width: 10px;
    height: 10px;
  }
`;

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
  const { track, bell } = useOutletContext();
  const [hlsUrl, setHlsUrl] = useState('https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8');

  const Live = styled.div`
    z-index: 3;
    position: fixed;
    right: 0;
    height: 100%;
    width: 330px;
    background: #ffe4b8;
    display: flex;
    flex-direction: column;
    opacity: 90%;
    padding-left: 35px;
    display: ${track};
    @media screen and (max-width: 1279px) {
      width: 100%;
      height: auto;
      padding-bottom: 30px;
    }
  `;

  const Push = styled.div`
    z-index: 3;
    position: fixed;
    right: 0;
    height: 100%;
    width: 330px;
    background: #ffe4b8;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    opacity: 90%;
    display: ${bell};
    @media screen and (max-width: 1279px) {
      width: 100%;
      height: auto;
    }
  `;

  return (
    <>
      <Live>
        <Tracked>追蹤名單</Tracked>
        <Person>
          <PersonHead />
          <PersonName>周杰倫</PersonName>
          <LiveCheck />
        </Person>
        <Person>
          <PersonHead />
          <PersonName>蔡依林</PersonName>
          <LiveCheck />
        </Person>
        <Person>
          <PersonHead />
          <PersonName>告五人</PersonName>
          <LiveCheck />
        </Person>
        <Person>
          <PersonHead />
          <PersonName>美秀姐</PersonName>
          <LiveCheck />
        </Person>
      </Live>
      <Push>
        <Messages>
          您被OOO追蹤中
          <MessagesUnread />
        </Messages>
        <Messages>
          您已完成取貨
          <MessagesUnread />
        </Messages>
        <Messages>
          您獲得了一張優待券
          <MessagesUnread />
        </Messages>
        <Messages>
          您追蹤的網紅正在直播
          <MessagesUnread />
        </Messages>
      </Push>
      <Carousel />
      <Video>
        <VideoInput>
          {/* <input
            type="text"
            className="form-control w-90 m-2 my-4"
            placeholder="HLS Url..."
            value={hlsUrl}
            aria-label="hls-url"
            aria-describedby="set-hls-url"
            onChange={(e) => setHlsUrl(e.target.value)}
          /> */}
          告五人的直播頁面
          <VideoLive />
          <VideoLove>❤️</VideoLove>
          <VideoNice>🥰</VideoNice>
          <VideoSuck>👎</VideoSuck>
        </VideoInput>
        <ReactHlsPlayer src={hlsUrl} autoPlay={false} controls={true} width="100%" height="auto" />
      </Video>
      <Products />
    </>
  );
}

export default Home;

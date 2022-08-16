import { useState, useEffect, useRef, useCallback } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import LiveStreamingAlert from "./LiveStreamingAlert";
import io from "socket.io-client";
import api from "../../utils/api";
import personhead from "./personhead.png";
//上傳影片Reels
import axios from "axios";
//直播畫面
import { MemoVideoLoad } from "../../components/LiveJump/VideoLoad";
import VideoProducts from "../../components/LiveJump//VideoProducts";
import Game from "./Game/Game";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`;
const UserMainColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SeeLive = styled.div`
  color: #e27d60;
  font-size: 20px;
  display: flex;
  position: absolute;
  z-index: 20;
  top: 300px;
  left: 700px;
  letter-spacing: 1.2px;
  @media (min-width: 600px) and (max-width: 1279px) {
    top: 240px;
    left: 380px;
  }
`;

const SeeLiveFinger = styled.div`
  font-size: 30px;
  padding-right: 5px;
  animation: seeme 0.8s linear infinite;
  @keyframes seeme {
    0% {
      transform: translate(0px, -5px);
    }
    50% {
      transform: translate(0px, 5px);
    }
    100% {
      transform: translate(0px, -5px);
    }
  }
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #f3efef;
  width: 100%;
  height: 200px;
`;
const UserInfoWrapper = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  align-items: center;

  & * {
    margin-right: 20px;
  }
  @media (max-width: 1279px) {
    width: 100%;
    justify-content: center;
    & * {
      margin-right: 10px;
    }
  }
`;

const NameFollowers = styled.div`
  display: flex;
  align-items: center;
`;

const NameButton = styled.div`
  @media (max-width: 1279px) {
  }
`;

const Photo = styled.img`
  border-radius: 50%;
  width: 150px;

  animation: pump 1s linear infinite;
  @keyframes pump {
    0% {
      box-shadow: 0px 0px 0px 0px rgba(255, 0, 0, 0.5);
      scale: 1;
    }
    50% {
      box-shadow: 0px 0px 15px 15px rgba(255, 0, 0, 0.5);
      scale: 1.05;
    }
    100% {
      box-shadow: 0px 0px 1px 1px rgba (255, 0, 0, 0.5);
      scale: 1;
    }
  }

  @media (max-width: 1279px) {
    width: 90px;
  }
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 500;
  white-space: nowrap;
  @media (max-width: 1279px) {
    font-size: 18px;
  }
`;

const Followers = styled.div`
  display: flex;

  @media (max-width: 1279px) {
  }
`;

const FollowersTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  @media (max-width: 1279px) {
    font-size: 14px;
  }
`;
const FollowersNumbers = styled.div`
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  @media (max-width: 1279px) {
    font-size: 14px;
  }
`;
const Button = styled.button`
  color: #fff;
  letter-spacing: 1px;
  margin: 10px 20px 10px 0px;
  padding: 5px 20px;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  @media (max-width: 1279px) {
    font-size: 12px;
    padding: 3px 5px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1279px) {
  }
`;
const LiveButton = styled(Button)`
  background-color: #e27d60;
  border: 1px solid #e27d60;
`;

const UploadVideoInputButton = styled(Button)`
  background-color: #e27d60;
  border: 1px solid #e27d60;
  @media (max-width: 1279px) {
  }
`;

const UploadVideoButton = styled(Button)`
  background-color: #e27d60;
  border: 1px solid #e27d60;
  @media (max-width: 1279px) {
  }
`;

const LogoutButton = styled(Button)`
  background-color: #8b572a;
  border: 1px solid #8b572a;
`;
const DailyTaskReminder = styled.div`
  color: #8b572a;
  height: 10vh;
  text-align: center;
  line-height: 10vh;
  font-size: 24px;
  border-bottom: 1px solid #f3efef;

  @media (max-width: 1279px) {
    font-size: 16px;
  }
`;
const Tabs = styled.div`
  border-bottom: 10px solid #f3efef;
  width: 80%;
  margin: 0px auto 0px auto;
  display: flex;
`;
const Tab = styled.div`
  height: 30px;
  line-height: 30px;
  color: #8b572a;
  border-radius: 5px 5px 0px 0px;
  border: 3px solid #f3efef;
  margin: 45px 15px 0px 0px;
  padding: 0px 10px;
  cursor: pointer;
  background-color: ${(props) => (props.$bgColor ? "#f3efef" : "none")};
  white-space: nowrap;
  @media (max-width: 1279px) {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
    padding: 0px 5px;
  }
`;
const GameWrapper = styled.div`
  background-color: #f3efef;
  height: 100%;
  width: 80%;
  margin: 20px auto;
`;
const ReelsPanel = styled.div`
  height: 500px;
  width: 80%;
  margin: 20px auto;
  display: flex;
  position: relative;
  @media (max-width: 1279px) {
    height: auto;
    flex-wrap: wrap;
    flex-direction: column;
  }
`;
const Reel = styled.div`
  height: 100%;
  width: 30%;
  background-color: #f3efef;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1279px) {
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 20px;
  }
`;
const ReelsDirection = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: #999;
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 40%;
  background-color: #fff;
  border: 1px solid #999;
  &:hover {
    background-color: #dcdcdc;
  }
`;
const ReelsLeft = styled(ReelsDirection)`
  left: -10px;
`;
const ReelsRight = styled(ReelsDirection)`
  right: -10px;
`;
const WishList = styled.div`
  width: 80%;
  margin: 20px auto;
`;

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState();
  let navigate = useNavigate();
  const [
    isLoggedIn,
    setIsLoggedIn,
    setShowMask,
    ws,
    setWs,
    setFollowList,
    setNotice,
  ] = useOutletContext();
  const [isLiveStreamingOn, setIsLiveStreamingOn] = useState(false);
  const [showLiveAlert, setShowLiveAlert] = useState(false);
  const [tabSelected, setTabSelected] = useState({
    task: true,
    reels: false,
    wishList: false,
    coupon: false,
  });
  const [liveKey, setLiveKey] = useState();
  const [url, setUrl] = useState();
  //Reels
  const [Reels, setReels] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [userID, setUserID] = useState(10250);
  //開啟關閉直播
  const [videoZone, setVideoZone] = useState("none");
  const closeVideo = useCallback(() => {
    setVideoZone("none");
  }, []);
  const openVideo = useCallback(() => {
    setVideoZone("block");
  }, []);

  function tabSwitched(target) {
    if (!target) return;
    let defaultTab = {
      task: false,
      reels: false,
      wishList: false,
      coupon: false,
    };
    defaultTab[target] = true;
    setTabSelected(defaultTab);
  }

  const disconnectWs = () => {
    ws.on("disconnect");
    setWs(null);
    console.log("disconnect");
  };

  const openLive = (data) => {
    const live = io("https://domingoos.store/influencer", {
      query: { live_setting: 1 },
      extraHeaders: {
        jwtToken: localStorage.getItem("jwtToken"),
      },
    });
    live.emit("liveInfo", { status: 1, products: data });
    live.on("disconnect");
  };

  const authLive = () => {
    const live = io("https://domingoos.store/influencer", {
      query: { live_setting: 1 },
      extraHeaders: {
        jwtToken: localStorage.getItem("jwtToken"),
      },
    });
    live.on("status", (data) => {
      if (data.status == 200) {
        //取得連線地址跟金鑰
        live.on("key", (data) => {
          if (data.status == 200) {
            setLiveKey(data.key);
            setUrl(data.url);
            setShowLiveAlert(true);
            setShowMask(true);
          } else {
            window.alert("金鑰取得失敗！");
          }
        });
      } else {
        alert("身份驗證失敗！");
      }
    });

    live.on("disconnect");
  };

  const closeLive = () => {
    const live = io("https://domingoos.store/influencer", {
      query: { live_setting: 0 },
      extraHeaders: {
        jwtToken: localStorage.getItem("jwtToken"),
      },
    });

    live.once("status", (res) => {
      if (res === "200") {
        live.emit("liveInfo", { status: 0 });
      }
    });
    live.on("disconnect");
  };

  useEffect(() => {
    async function getProfile() {
      const { data } = await api.getProfile(id);
      console.log(data);
      setProfile(data);
    }
    getProfile();
  }, [id]);

  useEffect(() => {
    if (isLoggedIn) {
      setWs(
        io("https://domingoos.store", {
          extraHeaders: {
            jwtToken: localStorage.getItem("jwtToken"),
          },
        })
      );
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (ws) {
      ws.on("status", (data) => {
        if (data.status === 200) {
          ws.on("followList", (data) => {
            setFollowList(data);
            console.log(data);
          });
          ws.on("live", (data) => {
            setNotice(data);
            console.log(data);
          });
        }
      });
    }
  }, [ws]);

  //＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝上傳影片＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  const jwtToken = localStorage.getItem("jwtToken");

  const inputRef = useRef();

  async function uploadVideo() {
    const video = inputRef.current.files[0];
    // video.userID = 1;
    let formData = new FormData();
    formData.append("video", video);
    formData.append("userID", 1);
    const { data } = await axios({
      method: "post",
      url: `https://www.domingoos.store/api/1.0/user/${userID}/reels`,
      data: formData,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    getVideo();
  }

  function inputClick() {
    inputRef.current.click();
  }

  //＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝上傳影片＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  //＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝Reel拿影片區＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  function ReelPageAdd() {
    setCurrentPage(currentPage + 1);
  }

  function ReelPageReduce() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function getVideo() {
    fetch(
      `https://www.domingoos.store/api/1.0/user/${userID}/reels?paging=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setReels(data.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getVideo();
  }, [currentPage]);

  if (!Reels) return null;

  //＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝Reel拿影片區＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  //================關閉直播區================

  const VideoBackground = styled.div`
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    position: fixed;
    background: black;
    opacity: 90%;
    z-index: 10;
    background: #a9a9a9;
  `;
  //================關閉直播區================

  return (
    <>
      <Wrapper>
        {videoZone === "block" && (
          <>
            <MemoVideoLoad closeVideo={closeVideo} />
            <VideoProducts />
            <VideoBackground />
          </>
        )}
        <UserMainColumn position={isLoggedIn}>
          {isLoggedIn && profile && (
            <UserWrapper>
              <UserInfoWrapper>
                <Photo
                  src={profile.picture || personhead}
                  onClick={openVideo}
                />
                <NameButton>
                  <NameFollowers>
                    <Name>{profile.name}</Name>
                    <Followers>
                      <FollowersTitle>粉絲數量</FollowersTitle>
                      <FollowersNumbers>
                        {profile.follower_count}
                      </FollowersNumbers>
                    </Followers>
                  </NameFollowers>
                  <ButtonWrapper>
                    {profile.role_id[0] === 3 && !isLiveStreamingOn ? (
                      <LiveButton
                        onClick={() => {
                          authLive();
                        }}
                      >
                        直播
                      </LiveButton>
                    ) : (
                      <LiveButton
                        onClick={() => {
                          closeLive();
                          setIsLiveStreamingOn(false);
                        }}
                      >
                        結束直播
                      </LiveButton>
                    )}
                    <UploadVideoInputButton onClick={inputClick}>
                      上傳
                      <input
                        ref={inputRef}
                        id="video-input"
                        type="file"
                        className="file-uploader"
                        data-target="file-uploader"
                        accept="video/*"
                        style={{ display: "none" }}
                      />
                    </UploadVideoInputButton>
                    <UploadVideoButton onClick={uploadVideo} id="video-btn">
                      提交
                    </UploadVideoButton>
                    <LogoutButton
                      onClick={() => {
                        window.localStorage.removeItem("jwtToken");
                        window.localStorage.removeItem("user");
                        setIsLoggedIn(false);
                        disconnectWs();
                        navigate("/login");
                      }}
                    >
                      登出
                    </LogoutButton>
                  </ButtonWrapper>
                </NameButton>
              </UserInfoWrapper>
            </UserWrapper>
          )}
          {showLiveAlert && (
            <LiveStreamingAlert
              setShowLiveAlert={setShowLiveAlert}
              setIsLiveStreamingOn={setIsLiveStreamingOn}
              setShowMask={setShowMask}
              openLive={openLive}
              liveKey={liveKey}
              url={url}
            />
          )}
          {isLoggedIn && (
            <DailyTaskReminder>你還未執行每日任務！</DailyTaskReminder>
          )}
          {isLoggedIn && (
            <Tabs onClick={(e) => tabSwitched(e.target.id)}>
              <Tab id="task" $bgColor={tabSelected.task}>
                每日任務
              </Tab>
              <Tab id="reels" $bgColor={tabSelected.reels}>
                Reels
              </Tab>
              <Tab id="wishList" $bgColor={tabSelected.wishList}>
                心願清單
              </Tab>
              <Tab id="coupon" $bgColor={tabSelected.coupon}>
                Coupon
              </Tab>
            </Tabs>
          )}
          {isLoggedIn && tabSelected.task ? (
            <GameWrapper>
              <Game />
            </GameWrapper>
          ) : isLoggedIn && tabSelected.reels ? (
            <ReelsPanel>
              <ReelsLeft onClick={ReelPageReduce}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </ReelsLeft>
              {Reels.map((video) => (
                <Reel>
                  <video
                    autoPlay
                    loop
                    height={480}
                    width={270}
                    controls
                    src={video.url}
                    muted
                  ></video>
                </Reel>
              ))}
              <ReelsRight onClick={ReelPageAdd}>
                <FontAwesomeIcon icon={faAngleRight} />
              </ReelsRight>
            </ReelsPanel>
          ) : isLoggedIn && tabSelected.WishList ? (
            <WishList />
          ) : null}
        </UserMainColumn>
      </Wrapper>
    </>
  );
}

export default Profile;

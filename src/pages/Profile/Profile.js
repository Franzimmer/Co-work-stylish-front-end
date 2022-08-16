import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import LiveStreamingAlert from "./LiveStreamingAlert";
import io from "socket.io-client";
import api from "../../utils/api";
import personhead from "./personhead.png";
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
    & * {
      margin-right: 10px;
    }
  }
`;
const Photo = styled.img`
  border-radius: 50%;
  width: 150px;

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
  flex-direction: column;
  @media (max-width: 1279px) {
  }
`;
const FollowersTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
  @media (max-width: 1279px) {
    font-size: 14px;
    margin-bottom: 5px;
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
    margin: 0px 0px 5px 0px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1279px) {
    flex-direction: column;
  }
`;
const LiveButton = styled(Button)`
  background-color: #e27d60;
  border: 1px solid #e27d60;
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
  height: 80px;
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
//再寫成獨立組件
const Game = styled.div`
  background-color: #f3efef;
  height: 500px;
  width: 80%;
  margin: 20px auto;
`;
const ReelsPanel = styled.div`
  height: 500px;
  width: 80%;
  margin: 20px auto;
  display: flex;
  position: relative;
`;
const Reel = styled.div`
  height: 100%;
  width: 30%;
  margin: 0px 10px;
  background-color: #f3efef;
  border-radius: 10px;
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
  return (
    <>
      <Wrapper>
        <UserMainColumn position={isLoggedIn}>
          {isLoggedIn && profile && (
            <UserWrapper>
              <UserInfoWrapper>
                <Photo src={profile.picture || personhead} />
                <Name>{profile.name}</Name>
                <Followers>
                  <FollowersTitle>粉絲數量</FollowersTitle>
                  <FollowersNumbers>{profile.follower_count}</FollowersNumbers>
                </Followers>
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
            <Game />
          ) : isLoggedIn && tabSelected.reels ? (
            <ReelsPanel>
              <ReelsLeft>
                <FontAwesomeIcon icon={faAngleLeft} />
              </ReelsLeft>
              <Reel />
              <Reel />
              <Reel />
              <ReelsRight>
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

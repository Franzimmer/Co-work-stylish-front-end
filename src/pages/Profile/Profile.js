import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import LiveStreamingAlert from "./LiveStreamingAlert";
import io from "socket.io-client";
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
  align-self: ${(props) => (props.position ? null : "center")};
`;
const UserWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3efef;
  width: 100%;
  position: relative;
  height: 18vh;
`;
const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 20px;
  left: 400px;

  @media (max-width: 1279px) {
    margin-top: 20px;
    left: 130px;
    bottom: 15px;
  }
`;
const Photo = styled.img`
  margin-top: 50px;
  border-radius: 50%;
  width: 150px;
  position: absolute;
  left: 200px;
  bottom: -35px;

  @media (max-width: 1279px) {
    width: 90px;
    margin-top: 20px;
    left: 30px;
    bottom: 10px;
  }
`;
const Name = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-top: 40px;

  @media (max-width: 1279px) {
    font-size: 20px;
  }
`;
const Mail = styled.div`
  margin-top: 10px;
  color: #999;
  @media (max-width: 1279px) {
    font-size: 14px;
  }
`;
const Followers = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 20px;
  left: 580px;
  @media (max-width: 1279px) {
    margin-top: 20px;
    left: 280px;
    bottom: 15px;
  }
`;
const FollowersTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
  @media (max-width: 1279px) {
    font-size: 16px;
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
  border-radius: 5px;
  position: absolute;
  bottom: 20px;
  cursor: pointer;
  white-space: nowrap;
  @media (max-width: 1279px) {
    padding: 5px;
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
  left: 700px;
  bottom: 50px;

  @media (min-width: 600px) and (max-width: 1279px) {
    margin-top: 20px;
    left: 380px;
    bottom: 20px;
  }

  @media (max-width: 599px) {
    margin-top: 20px;
    left: 250px;
    bottom: 60px;
  }
`;
const LogoutButton = styled(Button)`
  background-color: #8b572a;
  border: 1px solid #8b572a;
  left: 700px;
  bottom: 10px;

  @media (min-width: 600px) and (max-width: 1279px) {
    margin-top: 20px;
    left: 450px;
    bottom: 20px;
  }

  @media (max-width: 599px) {
    margin-top: 20px;
    left: 310px;
    bottom: 60px;
  }
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
  border-bottom: 4px solid #f3efef;
  height: 8vh;
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
  margin: calc(8vh - 30px) 15px 0px 0px;
  padding: 0px 10px;
  cursor: pointer;
  background-color: ${(props) => (props.$bgColor ? "#f3efef" : "none")};
  white-space: nowrap;
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
  const [profile, setProfile] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  // const { id } = useParams();
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
              <Photo src={profile.picture || personhead} />
              <UserInfoWrapper>
                <Name>{profile.name}</Name>
                <Mail>{profile.email}</Mail>
              </UserInfoWrapper>
              <Followers>
                <FollowersTitle>粉絲數量</FollowersTitle>
                <FollowersNumbers>209</FollowersNumbers>
              </Followers>
              <ButtonWrapper>
                {!isLiveStreamingOn ? (
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
                    {" "}
                    結束直播{" "}
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

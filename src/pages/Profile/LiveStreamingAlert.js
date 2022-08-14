import { useState } from "react";
import styled from "styled-components";
import search from "./search.png";
import api from "../../utils/api";

const LiveStreamingAlertWrapper = styled.div`
  width: 50vw;
  height: auto;
  align-self: center;
  margin-top: 100px;
  position: fixed;
  z-index: 5;
  background-color: #fff;
  border: 1px solid #e27d60;
  border-radius: 10px;
  padding: 10px 10px 30px;
  overflow-y: auto;
  @media screen and (max-width: 1279px) {
    margin: 0px;
    width: 100vw;
    height: auto;
  }
`;
const AlertCloseBtn = styled.div`
  color: #e27d60;
  font-weight: 700;
  font-size: 30px;
  text-align: end;
  margin: 10px auto;
  cursor: pointer;
`;
const AlertTitle = styled.p`
  color: #e27d60;
  font-weight: 700;
  letter-spacing: 5px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;
const AlertDesc = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px dashed #e27d60;
`;
const LiveStreamingSearchInput = styled.input`
  type: text;
  display: block;
  width: 60%;
  height: 35px;
  margin: 20px auto 0px auto;
  border-radius: 15px;
  border: 1px solid #979797;
  padding-left: 20px;
  background: url(${search});
  background-position: right center;
  background-repeat: no-repeat;
  background-size: contain;
`;
const LiveStreamingSearchResults = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 20vh;
  width: 60%;
  margin: 10px auto 10px auto;
  border: 1px solid #979797;
  position: relative;
`;
const LiveStreamingSearchReminder = styled.p`
  color: #999;
  font-size: 20px;
  letter-spacing: 5px;
  font0weight: 700;
  text-decoration: underline;
  text-align: center;
  line-height: 19vh;
`;
const LiveStreamingSearchResultsCloseBtn = styled.div`
  font-weight: 700;
  font-size: 30px;
  color: #333;
  text-align: center;
  position: absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
`;
const LiveStreamingSearchResult = styled.div`
  width: 90%;
  height: 16vh;
  display: flex;
  margin: 10px;
  border-bottom: 1px dashed #e27d60;
`;
const LiveStreamingSearchResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;
const LiveStreamingSearchResultText = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #555;
`;
const LiveStreamingSearchResultImage = styled.div`
  width: 30%;
  background-image: url(${(props) => props.path});
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0px 0px 10px 0px;
`;
const LiveStreamingSearchResultAddBtn = styled.div`
  border-radius: 50%;
  font-weight: 700;
  font-size: 24px;
  color: #fff;
  width: 28px;
  height: 28px;
  text-align: center;
  line-hright: 28px;
  background-color: #e27d60;
  margin: 0px 0px 10px auto;
  align-self: flex-end;
  cursor: pointer;
`;
const LiveStreamingProductList = styled.div`
  display: flex;
  flex-direction: column;
  height: 18vh;
  overflow-y: auto;
  width: 80%;
  margin: 30px auto 0px auto;
  border-bottom: 1px solid #e27d60;
`;
const LiveStreamingListTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #e27d60;
  border-bottom: 3px solid #e27d60;
  margin-bottom: 5px;
`;
const LiveStreamingProduct = styled.div`
  margin: 5px 0px;
`;
const LiveStreamingSendBtn = styled.div`
  width: 100px;
  height: 25px;
  font-size: 14px;
  letter-spacing: 1px;
  text-align: center;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  background: #e27d60;
  display: block;
  margin: 30px auto;
  cursor: pointer;
`;
const NextStepBtn = styled.button`
  width: 50px;
  height: 30px;
  background-color: #e27d60;
  color: #fff;
  border: none;
  display: block;
  margin: 50px auto;
  cursor: pointer;
`;
const LiveStreamInfo = styled.p`
  color: #666;
  font-size: 30px;
  text-align: center;
  margin: 50px 0px;
`;

function LiveStreamingAlert({ setShowLiveAlert, setIsLiveStreamingOn }) {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [liveStreamProductList, setLiveStreamProductList] = useState([]);
  const [step, setStep] = useState(0);
  async function searchLiveStreamProduct() {
    let { data } = await api.searchProducts(inputValue, 0);
    setSearchResults(data);
  }
  function addLiveStreamProductList(e) {
    let productId = e.parentNode.id;
    let product = searchResults.find(
      (result) => result.id === Number(productId)
    );
    let currentList = [...liveStreamProductList];
    let productListItem = { id: product.id, name: product.title };
    currentList.unshift(productListItem);
    setLiveStreamProductList(currentList);
  }

  return (
    <LiveStreamingAlertWrapper>
      <AlertCloseBtn onClick={() => setShowLiveAlert(false)}>X</AlertCloseBtn>
      {step === 0 ? (
        <>
          <AlertTitle>直播準備</AlertTitle>
          <AlertDesc>
            開始直播前請準備好串流軟體，在軟體中輸入連線地址與密鑰
          </AlertDesc>
          <LiveStreamInfo>連線地址</LiveStreamInfo>
          <LiveStreamInfo>串流金鑰</LiveStreamInfo>
          <NextStepBtn onClick={() => setStep(1)}>下一步</NextStepBtn>
        </>
      ) : null}
      {step === 1 ? (
        <>
          <AlertTitle>編輯直播商品清單</AlertTitle>
          <LiveStreamingSearchInput
            placeholder="輸入商品名稱"
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.target.value) {
                searchLiveStreamProduct();
              }
            }}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <LiveStreamingSearchResults>
            {searchResults ? (
              <>
                <LiveStreamingSearchResultsCloseBtn
                  onClick={() => setSearchResults()}
                >
                  X
                </LiveStreamingSearchResultsCloseBtn>
                {searchResults &&
                  searchResults.map((result) => (
                    <LiveStreamingSearchResult key={result.id} id={result.id}>
                      <LiveStreamingSearchResultImage
                        path={result.main_image}
                      />
                      <LiveStreamingSearchResultInfo>
                        <LiveStreamingSearchResultText>
                          {result.title}
                        </LiveStreamingSearchResultText>
                        <LiveStreamingSearchResultText>
                          {result.id}
                        </LiveStreamingSearchResultText>
                      </LiveStreamingSearchResultInfo>
                      <LiveStreamingSearchResultAddBtn
                        onClick={(e) => addLiveStreamProductList(e.target)}
                      >
                        +
                      </LiveStreamingSearchResultAddBtn>
                    </LiveStreamingSearchResult>
                  ))}
              </>
            ) : (
              <LiveStreamingSearchReminder>
                請搜尋商品來加入清單
              </LiveStreamingSearchReminder>
            )}
          </LiveStreamingSearchResults>

          <LiveStreamingProductList>
            <LiveStreamingListTitle>介紹商品清單</LiveStreamingListTitle>
            {liveStreamProductList.map((item) => {
              return (
                <LiveStreamingProduct key={item.id}>
                  {item.name}
                </LiveStreamingProduct>
              );
            })}
          </LiveStreamingProductList>
          <NextStepBtn onClick={() => setStep(2)}>下一步</NextStepBtn>
        </>
      ) : null}
      {step === 2 ? (
        <>
          <AlertTitle>最後一步！</AlertTitle>
          <AlertDesc>
            在串流軟體上開啟直播後，在回來按下按鈕，我們會為你通知你的粉絲你的直播已開始！
          </AlertDesc>
          <LiveStreamingSendBtn
            onClick={() => {
              setIsLiveStreamingOn(true);
              setShowLiveAlert(false);
            }}
          >
            準備好了！
          </LiveStreamingSendBtn>
        </>
      ) : null}
    </LiveStreamingAlertWrapper>
  );
}

export default LiveStreamingAlert;

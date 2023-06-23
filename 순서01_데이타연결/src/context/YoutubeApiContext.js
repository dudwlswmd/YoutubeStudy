import { createContext, useContext } from "react";
//import FakeYoutube from "../api/fakeYoutube";
import Youtube from "../api/youtube";
import YoutubeClient from "../api/youtubeClient";
import fakeYoutubeClient from "../api/fakeYoutubeClient";

export const YoutubeApiContext = createContext();

//const youtube = new FakeYoutube(); //클라스의 인스턴스로 가져온거기때문에 value={{youtube}} 중괄호 사용
//const client = new YoutubeClient();
const client = new fakeYoutubeClient();
const youtube = new Youtube(client);
//youtube에서 불러온 주소 api를 컨텍스트로 만들어 아무곳에서나 쓸 수 있도록

//컨텍스트가 적용될 영역을 지정하는 함수 정의
export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

//value에 접근할수있게 만드는 함수
export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}

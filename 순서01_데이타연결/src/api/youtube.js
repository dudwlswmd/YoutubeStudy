//실제 유튜브 연결
//옵션만 처리

export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#popular();
  }

  //아이디값만 수정해서 얻어옴
  async #searchByKeyword(keyword) {
    //# - 내부에서만 사용 가능한 private 함수
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          q: keyword,
          regionCode: "kr",
          type: "video",
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #popular() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
          regionCode: "kr",
        },
      })
      .then((res) => res.data.items);
  }
}

import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import VideoCard from '../components/VideoCard';
// import { search } from '../api/youtube';
import fakeYoutubeClient from '../api/fakeYoutubeClient';
import Youtube from '../api/youtube';
import { YoutubeApiContext, useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
  const { keyword } = useParams();
  const {youtube} = useYoutubeApi();//context파일에서 만든 함수 가져옴

  const { 
    isLoading, 
    error, 
    data:videos 
  } = useQuery( ['videos',keyword], ()=> youtube.search(keyword))
    //const youtube = new FakeYoutube();  
    //const youtube = new Youtube();
    //return youtube.search(keyword);

  /*
    const { isLoading, error, data } = useQuery([],fnc,options)
  */

  console.log('videos ? ', videos)
  return (
    <>
      <div>Videos - { keyword ? ` 🔍 ${keyword}` : '🔥인기동영상'} </div>
      {/* //keyword가 있을때 / 없을때  */}

      {isLoading && <p>Loading...</p>}
      {error && <p>🚨 에러발생 🚨</p>}

      {videos && ( 
        <ul>
          {videos.map((video)=>(
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
  </>
  )
}

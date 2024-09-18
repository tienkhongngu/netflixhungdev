import React, { useCallback } from 'react'
import { CiCircleInfo } from "react-icons/ci";

import useBillboard from '@/hooks/useBillboard'
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';

const Billboard = () => {
    
    const { data } = useBillboard();
    const {openModal} = useInfoModal();

    const handleOpenModal = useCallback (() =>{
      openModal(data?.id)
    }, [openModal, data?.id])
    

  return (
    <div className='relative h-[56.25vw]'>
      <video 
        autoPlay
        loop
        muted
        
        poster={data?.thumbnailUrl} 
        
        // src={data?.videoUrl} 
        src='https://videos.pexels.com/video-files/6813515/6813515-hd_1920_1080_24fps.mp4'

        className='
          w-full
          h-[56.25vw]
          object-cover
          '>
        </video>
        <div className='absolute top-[45%] md:top-[40%] ml-4 md:ml-16'>
          
          <p className='text-white md:text-5xl h-full w-[50%] lg:text-6x1 font-bold drop-shadow-xl uppercase'>
            {data?.title}
          </p>
          <p className='text-white text-[15px] mt-3 md:mt-8 w-[85%] md:w-[80%] lg:w-[50%] drop-shadow-xl' >
            {data?.description}
          </p>
          <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
            <PlayButton movieId={data?.id}/>
            <button onClick={handleOpenModal}
                className='
                    bg-white 
                    text-white 
                    bg-opacity-30 
                    rounded-md 
                    py-1 md:py-2 
                    px2 md:px-4
                    w-auto 
                    text-sx 
                    lg:text-lg 
                    font-semibold 
                    hover:bg-opacity-20 
                    transition' >
            <CiCircleInfo className='inline'/> Xem thêm
            </button>
          </div>
        </div>
    </div>
  )
}

export default Billboard
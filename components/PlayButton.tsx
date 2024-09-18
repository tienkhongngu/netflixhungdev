import React from 'react'
import { useRouter } from 'next/router'

import { FaPlay } from "react-icons/fa";

interface PlayButtonProps {
    movieId: string;
}

const PlayButton:React.FC<PlayButtonProps> = ({movieId}) => {
    const router = useRouter();

    return(
        <button onClick={() => router.push(`/watch/${movieId}`)}
            className='
                bg-white
                rounded-md
                py-1 md:py-2
                px-2 md:px-4
                w-auto
                text-xs lg:text-lg
                font-semibold
                flex 
                item-center
                hover:bg-neutral-300
                transition'>
            <FaPlay size={20} className='mr-2 mt-1'/>
            Xem phim
        </button>
    )
}

export default PlayButton;
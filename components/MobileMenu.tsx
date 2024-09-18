import React from 'react'

interface MobileMenuProps{
    visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps>= ({visible}) => {
  if (!visible){
    return null;
  }

    return (
    <div className='bg-black bg-opacity-80 w-56 absolute top-10 left-0 py-5 flex-col border-2 border-gray-800 flex'>
      <div className='flex flex-col gap-4'>
        <div className='px-3 text-center text-white hover:underline my-2'>
        Trang chủ
        </div>
        <hr className='bg-gray-600 border-0 h-px'/>
        <div className='px-3 text-center text-white hover:underline my-2'>
        Phim T.Hình
        </div>
        <hr className='bg-gray-600 border-0 h-px'/>
        <div className='px-3 text-center text-white hover:underline my-2'>
        Phim truyện
        </div>
        <hr className='bg-gray-600 border-0 h-px'/>
        <div className='px-3 text-center text-white hover:underline my-2'>
        Mới và phổ biến
        </div>
        <hr className='bg-gray-600 border-0 h-px'/>
        <div className='px-3 text-center text-white hover:underline my-2'>
        Danh sách của tôi
        </div>
        <hr className='bg-gray-600 border-0 h-px'/>
        <div className='px-3 text-center text-white hover:underline my-2'>
        Theo ngôn ngữ
        </div>
      </div>
    </div>
  )
}

export default MobileMenu

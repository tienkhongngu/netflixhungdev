// pages/index.tsx
import { Inter } from 'next/font/google';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites'
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context); // Lấy session từ next-auth

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList(); // Lấy danh sách phim đang xu hướng
  const {data: favorites = [] } = useFavorites();
  const {isOpen, closeModal } = useInfoModal();

  return (
    <div className="">
      <InfoModal visible ={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40 pt-2 flex flex-col">
        <MovieList title="Đang xu hướng" data={movies} />
        <MovieList title="Danh sách phim yêu thích" data={favorites}/>          
      </div>
    </div>
  );
}

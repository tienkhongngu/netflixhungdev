import axios from "axios";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import { FiPlus, FiCheck } from "react-icons/fi";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();
  
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    if (!userEmail) return;

    try {
      let response;

      if (isFavorite) {
        response = await axios.delete("/api/favorite", {
          data: { movieId, email: userEmail },
        });
      } else {
        response = await axios.post("/api/favorite", {
          movieId,
          email: userEmail,
        });
      }

      const updatedFavoriteIds = response?.data?.favoriteIds;

      mutate({
        ...currentUser,
        favoriteIds: updatedFavoriteIds,
      });

      mutateFavorites();
    } catch (error) {
      console.log(error);
    }
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites, userEmail]);

  const Icon = isFavorite ? FiCheck : FiPlus;

  return (
    <div
      onClick={toggleFavorites}
      className="
        cursor-pointer
        w-6 lg:w-10
        h-6 lg:h-10
        border-white
        rounded-full
        border-2
        flex justify-center
        items-center
        transition
        hover:border-neutral-300
      "
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;

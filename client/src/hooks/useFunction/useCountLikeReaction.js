"use client"

import {useEffect, useState} from "react";

const useCountLikeReaction = (entity) => {
    const [totalLike, setTotalLike] = useState(0);

    const countLike = (like) => {
        let countLike = 0;

        like.map((like) => {
            if (like.reaction_type === "Like") {
                countLike += 1;
            }
        })

        return countLike;
    };

    useEffect(() => {
        if (entity && entity.reaction && entity.reaction.length > 0) {
            const likeCount = countLike(entity.reaction);
            setTotalLike(likeCount);
        }
    }, [entity]);

    return totalLike;
};

export default useCountLikeReaction;
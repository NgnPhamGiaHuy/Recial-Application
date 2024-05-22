"use client"

import { useDispatch } from "react-redux";

import { useGetMediaFetcher } from "@/hooks";
import { setMediaAuthor, setMediaComment, setMediaData, setMediaReaction, setMediaRecent } from "@/store/actions/media/mediaActions";

const usePostMediaData = (user, post, photo) => {
    const dispatch = useDispatch();

    const endpoints = [
        { url: `photo/?photo_id=${photo}`, action: setMediaData },
        { url: `post/author/?user_id=${user}`, action: setMediaAuthor },
        { url: `post/comment/?photo_id=${photo}`, action: setMediaComment },
        { url: `post/reaction/?photo_id=${photo}`, action: setMediaReaction },
        { url: `post/recent/?post_id=${post}`, action: setMediaRecent },
    ]

    const results = endpoints.map(({ url, action }) => useGetMediaFetcher(url, action, dispatch))

    return {
        mediaProps: results[0].data,
        mediaAuthorProps: results[1].data,
        mediaCommentProps: results[2].data,
        mediaReactionProps: results[3].data,
        mediaPhotoRecentProps: results[3].data,
        errors: results.map(result => result.error),
        loadingStates: results.map(result => result.isLoading),
        validatingStates: results.map(result => result.isValidating),
    }
}

export default usePostMediaData;

"use client"

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useGetMediaFetcher } from "@/hooks";
import { clearMediaDataRecent, setMediaData, setMediaAuthorData, setMediaCommentData, setMediaReactionData, setMediaSavedData } from "@/store/actions/media/mediaActions";

const usePhotoData = (user, photo) => {
    const dispatch = useDispatch();

    const endpoints = [
        { url: `photo/?photo_id=${photo}`, action: setMediaData },
        { url: `photo/author/?user_id=${user}`, action: setMediaAuthorData },
        { url: `photo/saved/?photo_id=${photo}`, action: setMediaSavedData },
        { url: `photo/comment/?photo_id=${photo}`, action: setMediaCommentData },
        { url: `photo/reaction/?photo_id=${photo}`, action: setMediaReactionData },
    ];

    const results = endpoints.map(({ url, action }) => useGetMediaFetcher(url, action, dispatch));

    useEffect(() => {
        dispatch(clearMediaDataRecent());
    }, [dispatch]);

    return {
        mediaProps: results[0].data,
        mediaAuthorProps: results[1].data,
        mediaCommentProps: results[2].data,
        mediaReactionProps: results[3].data,
        errors: results.map(result => result.error),
        loadingStates: results.map(result => result.isLoading),
        validatingStates: results.map(result => result.isValidating),
    };
}

export default usePhotoData;

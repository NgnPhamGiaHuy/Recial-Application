"use client"

import useSWR from "swr";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetcherWithoutAccessToken } from "@/utils";

const useGetPageDataFetcher = (groupId, endpoint, setDataAction) => {
    const dispatch = useDispatch();
    const { data, error, isLoading, isValidating } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/page/${endpoint}/?page=${groupId}`, fetcherWithoutAccessToken);

    useEffect(() => {
        if (data) {
            dispatch(setDataAction(data));
        }
    }, [data, dispatch, setDataAction]);

    return { data, error, isLoading, isValidating };
}

export default useGetPageDataFetcher;
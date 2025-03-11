import useLogout from "@/hooks/useAuth/actions/useLogout";
import useSignup from "@/hooks/useAuth/core/useSignup";
import useCheckAccessToken from "@/hooks/useAuth/wrappers/useCheckAccessToken";
import useDecodeToken from "@/hooks/useAuth/core/useDecodeToken";
import useTokenRefresh from "@/hooks/useAuth/core/useTokenRefresh";
import useWithAuth from "@/hooks/useAuth/wrappers/useWithAuth";

import useCommentData from "@/hooks/useComment/useCommentData";
import useCommentMediaData from "@/hooks/useComment/useCommentMediaData";

import useCreatePostDialogAudience from "@/hooks/useCreatePost/useCreatePostDialogAudience";

import { useEventData } from "@/hooks/useEvent/useEventData";

import useFriendData from "@/hooks/useFriendData/useFriendData";

import useClickOutside from "@/hooks/useFunction/useClickOutside";
import useContentEditable from "@/hooks/useFunction/useContentEditable";
import useCountComment from "@/hooks/useFunction/useCountComment";
import useCountLikeReaction from "@/hooks/useFunction/useCountLikeReaction";
import useDataFetcher from "@/hooks/useFunction/useDataFetcher";
import useDateOfBirth from "@/hooks/useFunction/useDateOfBirth";
import useFetchAndScroll from "@/hooks/useFunction/useFetchAndScroll";
import useFilteredNotification from "@/hooks/useFunction/useFilteredNotification";
import useSingleImageData from "@/hooks/useFunction/useSingleImageData";
import useMultipleImagesData from "@/hooks/useFunction/useMultipleImagesData";
import useEmojiHandler from "@/hooks/useFunction/useEmojiHandler";
import useMostReactedIcons from "@/hooks/useFunction/useMostReactedIcons";
import useMultipleHandleState from "@/hooks/useFunction/useMultipleHandleState";
import useMultipleRefs from "@/hooks/useFunction/useMultipleRefs";
import useOverflowText from "@/hooks/useFunction/useOverflowText";
import useResetInput from "@/hooks/useFunction/useResetInput";
import useScrollHandler from "@/hooks/useFunction/useScrollHandler";
import useSliderScroll from "@/hooks/useFunction/useSliderScroll";
import useToggleState from "@/hooks/useFunction/useToggleState";
import useWeatherData from "@/hooks/useFunction/useWeatherData";
import useWeatherForecast from "@/hooks/useFunction/useWeatherForecast";

import useGroupCreateAction from "@/hooks/useGroup/useGroupCreateAction";
import useGetGroupData from "@/hooks/useGroup/useGetGroupData";
import useGetGroupDataFetcher from "@/hooks/useGroup/useGetGroupDataFetcher";
import useGetGroupPostData from "@/hooks/useGroup/useGetGroupPostData";
import useGetGroupFeedData from "@/hooks/useGroup/useGetGroupFeedData";
import useGetGroupFeedPostData from "@/hooks/useGroup/useGetGroupFeedPostData";
import useCheckUserGroupRole from "@/hooks/useGroup/useCheckUserGroupRole";
import useFilterUserGroupsByRole from "@/hooks/useGroup/useFilterUserGroupsByRole";
import useGetGroupDataAfterFilterUserRole from "@/hooks/useGroup/useGetGroupDataAfterFilterUserRole";

import useHeaderRef from "@/hooks/useHeader/useHeaderRef";
import useHeaderInteractions from "@/hooks/useHeader/useHeaderInteractions";

import useGetMediaFetcher from "@/hooks/useMedia/useGetMediaFetcher";
import useGetVideoMediaFetcher from "@/hooks/useMedia/useGetVideoMediaFetcher";
import usePostMediaData from "@/hooks/useMedia/usePostMediaData";
import useMediaNavigation from "@/hooks/useMedia/useMediaNavigation";
import useMediaCopyLink from "@/hooks/useMedia/useMediaCopyLink";
import usePhotoData from "@/hooks/useMedia/usePhotoData";
import useStoryData from "@/hooks/useMedia/useStoryData";
import useUserStoryData from "@/hooks/useMedia/useUserStoryData";
import useStoryControls from "@/hooks/useMedia/useStoryControls";

import useMessageData from "@/hooks/useMessage/useMessageData";
import useMessageScaffold from "@/hooks/useMessage/useMessageScaffold";
import useSetMessageId from "@/hooks/useMessage/useSetMessageId";
import useSetMessageData from "@/hooks/useMessage/useSetMessageData";
import useSubmitMessageData from "@/hooks/useMessage/useSubmitMessageData";
import useGetMessageDataByConversationId from "@/hooks/useMessage/useGetMessageDataByConversationId";
import useMessageTimestampDisplay from "@/hooks/useMessage/useMessageTimestampDisplay";

import useGetPageData from "@/hooks/usePage/useGetPageData";
import useGetPagePostData from "@/hooks/usePage/useGetPagePostData";
import useGetPageDataFetcher from "@/hooks/usePage/useGetPageDataFetcher";
import useCheckUserPageRole from "@/hooks/usePage/useCheckUserPageRole";

import useNotificationCount from "@/hooks/useNotification/useNotificationCount";
import useNotificationState from "@/hooks/useNotification/useNotificationState";
import useNotificationAnimation from "@/hooks/useNotification/useNotificationAnimation";
import useNotificationHeaderItemAction from "@/hooks/useNotification/useNotificationHeaderItemAction";

import useGetPostData from "@/hooks/usePost/usePostData";
import useSetPostData from "@/hooks/usePost/useSetPostData";
import usePostItemData from "@/hooks/usePost/usePostItemData";
import usePostDataByUserId from "@/hooks/usePost/usePostDataById";
import usePostItemAnimation from "@/hooks/usePost/usePostItemAnimation";
import usePostItemToggleState from "@/hooks/usePost/usePostItemToggleState";
import usePostItemMultipleRef from "@/hooks/usePost/usePostItemMultipleRef";

import useRoleData from "@/hooks/useRole/useRoleData";

import useSearchData from "@/hooks/useSearch/useSearchData";

import { useSuggestEventData, useSuggestGroupData, useSuggestPageData } from "@/hooks/useSuggest/useSuggestData";

import useUserData from "@/hooks/useUser/useUserData";
import useUserIdLayout from "@/hooks/useUser/useUserIdLayout";
import useCheckUserFriend from "@/hooks/useUser/useCheckUserFriend";
import useGetUserDataFetcher from "@/hooks/useUser/useGetUserDataFetcher";
import useGetUserDataFetcherByPage from "@/hooks/useUser/useGetUserDataFetcherByPage";
import useUpdateUserProfile from "@/hooks/useUser/useUpdateUserProfile";
import useUserProfile from "@/hooks/useUser/useUserProfile";
import useUserProfileActions from "@/hooks/useUser/useUserProfileActions";

import useVideoData from "@/hooks/useVideo/useVideoData";
import useVideoScaffold from "@/hooks/useVideo/useVideoScaffold";
import useWatchData from "@/hooks/useVideo/useWatchData";
import useCreateVideoData from "@/hooks/useVideo/useCreateVideoData";
import useHandleUploadVideo from "@/hooks/useVideo/useHandleUploadVideo";
import useHandleUploadThumbnail from "@/hooks/useVideo/useHandleUploadThumbnail";

import useWebSocket from "@/hooks/useWebSocket/useWebSocket";

export {
    useCheckAccessToken, useDecodeToken, useLogout, useSignup, useTokenRefresh, useWithAuth,

    useCommentData, useCommentMediaData,

    useCreatePostDialogAudience,

    useEventData,

    useFriendData,

    useClickOutside, useContentEditable, useCountComment, useCountLikeReaction, useDataFetcher, useDateOfBirth, useFetchAndScroll, useFilteredNotification, useSingleImageData, useMultipleImagesData, useEmojiHandler, useMostReactedIcons, useMultipleHandleState, useMultipleRefs, useOverflowText, useResetInput, useScrollHandler, useSliderScroll, useToggleState, useWeatherData, useWeatherForecast,

    useGroupCreateAction, useGetGroupData, useGetGroupDataFetcher, useGetGroupPostData, useGetGroupFeedData, useGetGroupFeedPostData, useCheckUserGroupRole, useFilterUserGroupsByRole, useGetGroupDataAfterFilterUserRole,

    useHeaderRef, useHeaderInteractions,

    useGetMediaFetcher, useGetVideoMediaFetcher, usePostMediaData, useMediaNavigation, useMediaCopyLink, usePhotoData, useStoryData, useUserStoryData, useStoryControls,

    useMessageData, useMessageScaffold, useGetMessageDataByConversationId, useMessageTimestampDisplay, useSetMessageId, useSetMessageData, useSubmitMessageData,

    useGetPageData, useGetPagePostData, useGetPageDataFetcher, useCheckUserPageRole,

    useNotificationCount, useNotificationState, useNotificationAnimation, useNotificationHeaderItemAction,

    useGetPostData, useSetPostData, usePostItemData, usePostItemAnimation, usePostItemToggleState, usePostItemMultipleRef, usePostDataByUserId,

    useRoleData,

    useSearchData,

    useSuggestEventData, useSuggestGroupData, useSuggestPageData,

    useUserData, useUserIdLayout, useCheckUserFriend, useGetUserDataFetcher, useGetUserDataFetcherByPage, useUpdateUserProfile, useUserProfile, useUserProfileActions,

    useVideoData, useVideoScaffold, useWatchData, useCreateVideoData, useHandleUploadVideo, useHandleUploadThumbnail,

    useWebSocket,
}
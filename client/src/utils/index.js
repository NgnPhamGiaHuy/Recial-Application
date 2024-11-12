import fetchLoginData from "@/utils/auth/fetchAuthData/fetchLoginData";
import fetchRegisterData from "@/utils/auth/fetchAuthData/fetchRegisterData";
import fetchTokenRefresh from "@/utils/auth/fetchAuthData/fetchTokenRefresh";
import encryptData from "@/utils/auth/handleCrypto/encryptData";
import decryptData from "@/utils/auth/handleCrypto/decryptData";
import authService from "@/utils/auth/service/authService";
import handleValidateForm from "@/utils/auth/handleValidateForm";
import handleCheckPasswordStrength from "@/utils/auth/handleCheckPasswordStrength";
import handleDecodeToken from "@/utils/auth/handleDecodeToken";
import handleValidEmail from "@/utils/auth/handleValidEmail";

import calculateAttachmentStyles from "@/utils/calculate/calculateAttachmentStyles";
import calculateGridProperties from "@/utils/calculate/calculateGridProperties";
import calculateTimeDifference from "@/utils/calculate/calculateTimeDifference";

import createPostComment from "@/utils/comment/createCommentData/createPostComment";
import updateComment from "@/utils/comment/updateCommentData/updateComment";
import updateNestedComments from "@/utils/comment/updateCommentData/updateNestedComments";

import fetchDataWithAccessToken from "@/utils/fetchData/fetchDataWithAccessToken";
import fetchDataWithAccessTokenAndData from "@/utils/fetchData/fetchDataWithAccessTokenAndData";

import fetcherWithAccessToken from "@/utils/fetcher/fetcherWithAccessToken";
import fetcherWithoutAccessToken from "@/utils/fetcher/fetcherWithoutAccessToken";
import fetchDataWithoutAccessToken from "@/utils/fetchData/fetchDataWithoutAccessToken";

import getGeocodeByCoordinates from "@/utils/geocode/getGeocodeByCoordinates";

import fetchGoogleData from "@/utils/google/fetchGoogleData";

import handleMultipleImageFileUpload from "@/utils/image/handleMultipleImageFileUpload";
import handleSingleImageFileUpload from "@/utils/image/handleSingleImageFileUpload";
import handleUploadImage from "@/utils/image/handleUploadImage";
import handleDeleteImage from "@/utils/image/handleDeleteImage";

import handleNewMediaData from "@/utils/media/handleNewMediaData";

import handleNewMessageData from "@/utils/message/handleNewMessageData/handleNewMessageData";
import handleCreateConversationData from "@/utils/message/handleCreateConversationData";
import handleDeleteMessage from "@/utils/message/handleDeleteMessage";
import handleDeleteConversation from "@/utils/message/handleDeleteConversation";
import renderMessageComponent from "@/utils/message/renderMessageComponent";
import shouldDisplayMessageWithTimeStamp from "@/utils/message/shouldDisplayMessageWithTimeStamp";

import handleFormatNumber from "@/utils/number/handleFormatNumber";

import handleDeletePostData from "@/utils/post/deletePostData/handleDeletePostData";
import handleNewPostData from "@/utils/post/handleNewPostData/handleNewPostData";

import createPostReaction from "@/utils/reaction/createReactionData/createPostReaction";
import handleReaction from "@/utils/reaction/handleReactionData/handleReaction";
import handleReactionData from "@/utils/reaction/handleReactionData/handleReactionData";
import updateCommentReaction from "@/utils/reaction/updateReactionData/updateCommentReaction";
import updatePostReaction from "@/utils/reaction/updateReactionData/updatePostReaction";

import handleSavedData from "@/utils/saved/handleSavedData";

import extractMonthAndDay from "@/utils/time/extractMonthAndDay";
import formatCurrentFullDate from "@/utils/time/formatCurrentFullDate";
import formatCurrentWeekday from "@/utils/time/formatCurrentWeekday";
import formatDate from "@/utils/time/formatDate";
import formatDateTime from "@/utils/time/formatDateTime";
import formatFullTimeAgo from "@/utils/time/formatFullTimeAgo";
import formatLongDate from "@/utils/time/formatLongDate";
import formatShortTimeAgo from "@/utils/time/formatShortTimeAgo";
import formatTime from "@/utils/time/formatTime";
import formatTime12Hour from "@/utils/time/formatTime12Hour";
import formatTimestampForCover from "@/utils/time/formatTimestampForCover";
import getCurrentAndNextSixDaysOfWeekNames from "@/utils/time/getCurrentAndNextSixDaysOfWeekNames";

import fetchUserData from "@/utils/user/fetchUserData/fetchUserData";
import getUserProfileData from "@/utils/user/fetchUserData/getUserProfileData";
import handleNewUserData from "@/utils/user/handleNewUserData/handleNewUserData";
import handleNewUserPostData from "@/utils/user/handleNewUserPostData/handleNewUserPostData";
import handleSetUserProfileData from "@/utils/user/handleSetUser/handleSetUserProfileData";
import handleFriendRequest from "@/utils/user/handleUserData/handleFriendRequest";
import handleSentFriendRequest from "@/utils/user/handleUserData/handleSentFriendRequest";

import extractVideoMetadata from "@/utils/video/extractVideoMetadata";
import uploadVideoDataOnCloud from "@/utils/video/uploadVideoDataOnCloud";
import deleteVideoDataOnCloud from "@/utils/video/deleteVideoDataOnCloud";
import discardVideoDataUpload from "@/utils/video/discardVideoDataUpload";
import handleFormatVideoSize from "@/utils/video/handleFormatVideoSize";
import handleFormatVideoDuration from "@/utils/video/handleFormatVideoDuration";
import handleCalculateUploadStatus from "@/utils/video/handleCalculateVideoUploadStatus";

import handleNewWatchData from "@/utils/watch/handleNewWatchData";

import getRandomWeatherIllustration from "@/utils/weather/getRandomWeatherIllustration";
import getWeatherForecastData from "@/utils/weather/getWeatherForecastData";
import interpretWeatherCode from "@/utils/weather/interpretWeatherCode";

export {
    fetchLoginData, fetchRegisterData, fetchTokenRefresh, encryptData, decryptData, authService, handleValidateForm, handleCheckPasswordStrength, handleDecodeToken, handleValidEmail,
    calculateAttachmentStyles, calculateGridProperties, calculateTimeDifference,
    createPostComment, updateComment, updateNestedComments,
    fetchDataWithAccessToken, fetchDataWithAccessTokenAndData,
    fetcherWithAccessToken, fetcherWithoutAccessToken, fetchDataWithoutAccessToken,
    getGeocodeByCoordinates,
    fetchGoogleData,
    handleMultipleImageFileUpload, handleSingleImageFileUpload, handleUploadImage, handleDeleteImage,
    handleNewMediaData,
    handleNewMessageData, handleCreateConversationData, handleDeleteMessage, handleDeleteConversation, renderMessageComponent, shouldDisplayMessageWithTimeStamp,
    handleFormatNumber,
    handleDeletePostData, handleNewPostData,
    createPostReaction, handleReaction, handleReactionData, updateCommentReaction, updatePostReaction,
    handleSavedData,
    extractMonthAndDay, formatCurrentFullDate, formatCurrentWeekday, formatDate, formatDateTime, formatFullTimeAgo, formatLongDate, formatShortTimeAgo, formatTime, formatTime12Hour, formatTimestampForCover, getCurrentAndNextSixDaysOfWeekNames,
    fetchUserData, getUserProfileData, handleNewUserData, handleNewUserPostData, handleSetUserProfileData, handleFriendRequest, handleSentFriendRequest,
    extractVideoMetadata, uploadVideoDataOnCloud, deleteVideoDataOnCloud, discardVideoDataUpload, handleFormatVideoSize, handleFormatVideoDuration, handleCalculateUploadStatus,
    handleNewWatchData,
    getRandomWeatherIllustration, getWeatherForecastData, interpretWeatherCode,
}
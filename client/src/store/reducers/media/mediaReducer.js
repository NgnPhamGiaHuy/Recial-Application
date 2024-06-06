import { updateComment } from "@/utils";

import { SET_MEDIA_DATA, SET_MEDIA_AUTHOR_DATA, SET_MEDIA_RECENT_DATA, SET_MEDIA_COMMENT_DATA, SET_MEDIA_REACTION_DATA } from "@/store/actions/media/mediaActions";
import { CREATE_MEDIA_COMMENT_DATA } from "@/store/actions/media/mediaActions";
import { CREATE_MEDIA_REACTION_DATA } from "@/store/actions/media/mediaActions";
import { DELETE_MEDIA_REACTION_DATA } from "@/store/actions/media/mediaActions";
import { CLEAR_MEDIA_DATA, CLEAR_MEDIA_DATA_RECENT } from "@/store/actions/media/mediaActions";

const initialState = {
    user: null,
    comment: null,
    reaction: null,
    media_recent: null,
}

const mediaReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MEDIA_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case SET_MEDIA_AUTHOR_DATA:
            return {
                ...state,
                user: action.payload,
            }
        case SET_MEDIA_RECENT_DATA:
            return {
                ...state,
                media_recent: action.payload,
            }
        case SET_MEDIA_COMMENT_DATA:
            return {
                ...state,
                comment: action.payload,
            }
        case SET_MEDIA_REACTION_DATA:
            return {
                ...state,
                reaction: action.payload,
            }
        case CREATE_MEDIA_COMMENT_DATA:
            if (state._id === action.payload.destination.destination_id) {
                const updatedComment = [...state.comment, action.payload.comment].sort().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                return {
                    ...state,
                    comment: updatedComment,
                }
            }

            const updatedComments = state.comment.map(comment => updateComment(comment, action));

            return {
                ...state,
                comment: updatedComments,
            }
        case CREATE_MEDIA_REACTION_DATA:
            const updatedReactions = [...state.reaction, action.payload].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            return {
                ...state,
                reaction: updatedReactions,
            }
        case DELETE_MEDIA_REACTION_DATA:
            const deletedReactions = state.reaction.filter(reaction => reaction._id.toString() !== action.payload.toString());

            return {
                ...state,
                reaction: deletedReactions,
            }
        case CLEAR_MEDIA_DATA:
            return initialState;
        case CLEAR_MEDIA_DATA_RECENT:
            return {
                ...state,
                media_recent: null,
            }
        default:
            return state;
    }
};

export default mediaReducer;
const { WebSocket } = require("ws");

class WebSocketService {
    constructor(wss) {
        this.wss = wss;
    }

    notifyClientsAboutUpdateProfile(userId) {
        if (this.wss) {
            const userProfileUpdateMessage = {
                type: "user_profile_update",
            }

            this.broadcastMessageToUser(userProfileUpdateMessage, userId);
        }
    }

    notifyClientsAboutUpdateFriendRequest(userId, status, updateFriendRequest) {
        if (this.wss) {
            const friendRequestUpdateMessage = {
                type: "friend_request_update",
                status: status,
                friendId: updateFriendRequest.source_id,
                friendRequestId: updateFriendRequest._id,
            }

            this.broadcastMessageToUser(friendRequestUpdateMessage, userId);
        }
    }

    notifyClientsAboutCreateFriendRequest(userId, destinationUserId, newFriendRequest) {
        if (this.wss) {
            const friendRequestMessage = {
                type: "friend_request_create",
                friendRequestId: newFriendRequest._id.toString(),
            }

            const friendRequestStatus = {

            }

            this.broadcastMessageToBetweenTwoUsers(friendRequestMessage, userId, destinationUserId);
        }
    }

    notifyClientsAboutNewComment(type, userId, newComment) {
        if (this.wss) {
            const commentMessage = {
                type: type,
                userId: userId.toString(),
                commentId: newComment._id.toString(),
            };

            this.broadcastMessage(commentMessage);
        }
    }

    notifyClientsAboutNewPost(userId, newPost) {
        if (this.wss) {
            const postMessage = {
                type: "create_new_post",
                postId: newPost._id.toString(),
            };

            this.broadcastMessageToUser(postMessage, userId);
        }
    };

    notifyClientsAboutNewMessage(conversationId, newMessage) {
        if (this.wss) {
            const message = {
                type: "create_message",
                messageId: newMessage._id.toString(),
            }
            console.log(conversationId)
            this.broadcastMessageToConversation(message, conversationId);
        }
    }

    notifyClientsAboutNewConversation(userIds, newConversation) {
        if (this.wss) {
            const conversationMessage = {
                type: "create_conversation",
                conversationId: newConversation._id.toString(),
            }

            this.broadcastMessageToMatchingClients(userIds, conversationMessage);
        }
    }

    notifyClientsAboutDeleteMessage(conversationId, messageId) {
        if (this.wss) {
            const deleteMessage = {
                type: "delete_message",
                messageId: messageId._id.toString(),
            }

            this.broadcastMessageToConversation(deleteMessage, conversationId);
        }
    }

    notifyClientsAboutDeleteConversation(userId, deletedConversation) {
        if (this.wss) {
            const deletedConversationMessage = {
                type: "delete_conversation",
                conversationId: deletedConversation._id.toString(),
            }

            this.broadcastMessageToUser(deletedConversationMessage, userId);
        }
    }

    notifyClientsAboutDeletePost (userId, deletedPost) {
        if (this.wss) {
            const deletePostMessage = {
                type: "delete_post",
                postId: deletedPost._id.toString(),
            };

            this.broadcastMessageToUser(deletePostMessage, userId);
        }
    }

    notifyClientsAboutCreateReaction(userId, newReaction, type = "create_reaction") {
        if (this.wss) {
            const newReactionMessage = {
                type: type,
                reactionId: newReaction._id.toString(),
                sourceId: newReaction.source_id.toString(),
                destinationId: newReaction.destination_id.toString(),
            }

            this.broadcastMessageToUser(newReactionMessage, userId);
        }
    }

    notifyClientsAboutUpdateReaction(userId, updatedReaction, type = "update_reaction") {
        if (this.wss) {
            const updatedReactionMessage = {
                type: type,
                reactionId: updatedReaction._id.toString(),
                sourceId: updatedReaction.source_id.toString(),
                destinationId: updatedReaction.destination_id.toString(),
            }

            this.broadcastMessageToUser(updatedReactionMessage, userId);
        }
    }

    notifyClientsAboutDeleteReaction(userId, deletedReaction, type = "delete_reaction") {
        if (this.wss) {
            const deletedReactionMessage = {
                type: type,
                reactionId: deletedReaction._id.toString(),
                sourceId: deletedReaction.source_id.toString(),
                destinationId: deletedReaction.destination_id.toString(),
            }

            this.broadcastMessageToUser(deletedReactionMessage, userId);
        }
    }

    notifyClientsAboutCreateVideoSaved(userId, newSaved) {
        if (this.wss) {
            const newSavedMessage = {
                type: "create_video_saved",
                savedId: newSaved._id.toString(),
                userId: newSaved.user_id.toString(),
                videoId: newSaved.video_id.toString(),
            }

            this.broadcastMessageToUser(newSavedMessage, userId);
        }
    }

    notifyClientsAboutUpdateVideoSaved(userId, updatedSaved) {
        if (this.wss) {
            const updatedSavedMessage = {
                type: "update_video_saved",
                savedId: updatedSaved._id.toString(),
                userId: updatedSaved.user_id.toString(),
                videoId: updatedSaved.video_id.toString(),
            }

            this.broadcastMessageToUser(updatedSavedMessage, userId);
        }
    }

    notifyClientsAboutDeleteVideoSaved(userId, deletedSaved) {
        if (this.wss) {
            const deletedSavedMessage = {
                type: "delete_video_saved",
                savedId: deletedSaved._id.toString(),
                userId: deletedSaved.user_id.toString(),
                videoId: deletedSaved.video_id.toString(),
            }

            this.broadcastMessageToUser(deletedSavedMessage, userId);
        }
    }

    broadcastMessage(message) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }

    broadcastMessageToUser(message, userId) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client.userId.toString() === userId.toString()) {
                client.send(JSON.stringify(message));
            }
        });
    }

    broadcastMessageToMatchingClients(userIds, message) {
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && userIds.includes(client.userId.toString())) {
                client.send(JSON.stringify(message));
            }
        });
    }

    broadcastMessageToConversation(message, conversationId) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client.conversationId.toString() === conversationId.toString()) {
                client.send(JSON.stringify(message));
            }
        });
    }

    broadcastMessageToBetweenTwoUsers(message, firstUser, secondUser) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client.userId.toString() === firstUser.toString()) {
                client.send(JSON.stringify(message));
            }

            if (client.readyState === WebSocket.OPEN && client.userId.toString() === secondUser.toString()) {
                client.send(JSON.stringify(message));
            }
        });
    }
}

module.exports = WebSocketService;
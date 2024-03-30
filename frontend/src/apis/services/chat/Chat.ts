import tokenInstance from '../../utils/tokenInstance';

export const getChatRoomId = async (anotherUserId: number) => {
  const response = await tokenInstance.get(`/chat/chat-room-id/${anotherUserId}`);
  return response.data;
};

export const getChatList = async (chatRoomId: string) => {
  const response = await tokenInstance.get(`/chat/list/message/${chatRoomId}`);
  return response.data;
};

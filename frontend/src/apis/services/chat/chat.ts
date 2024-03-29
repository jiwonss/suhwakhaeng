import tokenInstance from '../../utils/tokenInstance';

const chatUrl = 'chat/chat';

export const getChatList = async () => {
  const response = await tokenInstance.get(`${chatUrl}/list/log`);
  return response.data;
};

export const getChatData = async (params: { chatRoomId: string }) => {
  const response = await tokenInstance.get(`${chatUrl}/list/message/${params.chatRoomId}`);
  return response.data;
};

export const createChatUUID = async (params: { anotherUserId: number }) => {
  const response = await tokenInstance.get(`${chatUrl}/chat-room-id/${params.anotherUserId}`);
  return response.data;
};

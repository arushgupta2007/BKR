import { Connection, StreamManager } from 'openvidu-browser';
import { ChatMessage } from './chat-message';

export interface Participant {
    name: string;
    connectionId: string;
    chatMessages: ChatMessage[];
    videoStatus: boolean;
    audioStatus: boolean;
    connectionObject: Connection;
    subscriberObject: StreamManager
}
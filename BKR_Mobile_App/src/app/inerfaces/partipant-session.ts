import { Connection } from 'openvidu-browser';

interface ChatMessage {
    from: string,
    to: string,
    message: string,
}

export interface Participant {
    name: string;
    connectionId: string;
    chatMessages: ChatMessage[];
    videoStatus: boolean;
    audioStatus: boolean;
    connectionObject: Connection;
}
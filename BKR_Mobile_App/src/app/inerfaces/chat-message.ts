export interface ChatMessage {
    from: string,
    to: string,
    message: string,
    isSentByMe: boolean,
    createdAt: number,
}
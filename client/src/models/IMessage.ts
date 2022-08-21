export interface IMessage {
  id: number
  message: string
  type: string
  sender: number
  receiver: number
  status: string
  date: string
}

export interface ISendMessage {
  message: string
  type: string
  receiver: number
  sender: number
}
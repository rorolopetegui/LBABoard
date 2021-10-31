import create from 'zustand'
import { io } from './socket.io'

const loadSocketIo = () => io('http://192.168.0.188:5000')

const useStore = create(set => ({
  socket: loadSocketIo(),
}))

export default useStore

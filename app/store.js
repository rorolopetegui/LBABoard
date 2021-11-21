import create from 'zustand'
import { io } from './socket.io'

const loadSocketIo = () => io('http://192.168.0.188:5000')

const useStore = create(set => ({
  socket: loadSocketIo(),
  theme: 0,
  setTheme: theme => set({ theme }),
}))

export default useStore

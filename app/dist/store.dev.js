Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

const _zustand = _interopRequireDefault(require('zustand'))

const _socket = require('./socket.io')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const loadSocketIo = function loadSocketIo() {
  return (0, _socket.io)('http://192.168.43.32:5000')
}

const useStore = (0, _zustand.default)(function(set) {
  return {
    socket: loadSocketIo(),
  }
})
const _default = useStore
exports.default = _default

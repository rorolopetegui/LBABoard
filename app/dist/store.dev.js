"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zustand = _interopRequireDefault(require("zustand"));

var _socket = require("./socket.io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loadSocketIo = function loadSocketIo() {
  return (0, _socket.io)('http://192.168.43.32:5000');
};

var useStore = (0, _zustand["default"])(function (set) {
  return {
    socket: loadSocketIo()
  };
});
var _default = useStore;
exports["default"] = _default;
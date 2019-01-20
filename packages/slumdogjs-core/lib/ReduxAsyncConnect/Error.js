'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = require('./error.txt');

var Error = function (_Component) {
  (0, _inherits3.default)(Error, _Component);

  function Error() {
    (0, _classCallCheck3.default)(this, Error);
    return (0, _possibleConstructorReturn3.default)(this, (Error.__proto__ || (0, _getPrototypeOf2.default)(Error)).apply(this, arguments));
  }

  (0, _createClass3.default)(Error, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          'style',
          { type: "text/css" },
          style
        ),
        _react2.default.createElement(
          'div',
          { id: 'notfound' },
          _react2.default.createElement(
            'div',
            { className: 'notfound' },
            _react2.default.createElement(
              'div',
              { className: 'notfound-404' },
              _react2.default.createElement(
                'h1',
                null,
                'Oops!'
              ),
              _react2.default.createElement(
                'h2',
                null,
                '501 Not authorized. Please login and try again.'
              )
            ),
            _react2.default.createElement(
              'a',
              { href: '/' },
              'Go to Homepage'
            )
          )
        )
      );
    }
  }]);
  return Error;
}(_react.Component);

Error.defaultProps = {};

exports.default = Error;
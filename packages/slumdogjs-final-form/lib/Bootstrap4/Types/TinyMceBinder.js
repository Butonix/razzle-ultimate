'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TinyMceInput = require('./TinyMceInput');

var _TinyMceInput2 = _interopRequireDefault(_TinyMceInput);

var _AppContext = require('../../context/AppContext');

var _AppContext2 = _interopRequireDefault(_AppContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint react/no-danger: "off" */
var ContextBinder = function (_React$Component) {
  (0, _inherits3.default)(ContextBinder, _React$Component);

  function ContextBinder() {
    (0, _classCallCheck3.default)(this, ContextBinder);
    return (0, _possibleConstructorReturn3.default)(this, (ContextBinder.__proto__ || (0, _getPrototypeOf2.default)(ContextBinder)).apply(this, arguments));
  }

  (0, _createClass3.default)(ContextBinder, [{
    key: 'render',
    value: function render() {
      if (this.props.context.isStatic || this.props.field.static) {
        return _react2.default.createElement('div', { className: 'rte-readonly', dangerouslySetInnerHTML: { __html: this.props.input.value } });
      }

      return _react2.default.createElement(_TinyMceInput2.default, (0, _extends3.default)({ readOnly: true }, this.props.input, { className: this.props.field.className,
        tinymceConfig: (0, _assign2.default)({}, this.props.field.config) }));
    }
  }]);
  return ContextBinder;
}(_react2.default.Component);

var Binder = function Binder(props) {
  return _react2.default.createElement(
    _AppContext2.default.Consumer,
    null,
    function (context) {
      return _react2.default.createElement(ContextBinder, (0, _extends3.default)({ context: context }, props));
    }
  );
};

exports.default = Binder;
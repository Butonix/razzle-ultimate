import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import Radio from 'react-bootstrap/lib/FormCheck';
import FormControl from 'react-bootstrap/lib/FormControl';
import _isFunction from 'lodash/isFunction';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _chunk from 'lodash/chunk';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _isArray from 'lodash/isArray';
import AppContext from '../../context/AppContext';

class RadioBinder extends React.Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.searchBox = this.searchBox.bind(this);
    this.radioButtons = this.radioButtons.bind(this);
    this.radioButtonList = this.radioButtonList.bind(this);
    this.filtered = this.filtered.bind(this);
    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({value: e.target.value});
  }

  handlePrevent(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  filtered() {
    const list = _isArray(this.props.field.children) ? this.props.field.children : [this.props.field.children];

    if (_get(this.props.field, 'static', false) === true) {
      return _filter(list, {value: this.props.input.value});
    }

    const {value} = this.state;
    const strValue = String(value).toLowerCase();
    if (value !== '') {
      return _filter(list, option => _includes(String(option.children).toLowerCase(), strValue));
    }
    return list;
  }

  radioButtonList(list) {
    const staticField = this.props.context.isStatic || _get(this.props.field, 'static', false);
    return _map(list, (option, key) => {
      if (staticField === true) {
        return (<FormControl plaintext
                             readOnly
                             defaultValue={option.children} />);
      }

      let disabled = false;
      if (this.props.field && this.props.field.disabled && _isFunction(this.props.field.disabled)) {
        disabled = this.props.context.checkCondition(this.props.field.disabled(), _get(this.props.field, 'parent'));
      }
      return (
        <Radio
          id={`${this.props.input.name}-${key}`}
          key={key}
          disabled={disabled}
          type={'radio'}
          name={`${this.props.input.name}[${key}]`}
          value={option.props.value}
          checked={String(this.props.input.value) === String(option.props.value)}
          onChange={(event) => {
            if (event.target.checked) {
              this.props.input.onChange(option.props.value);
            }
          }}
          label={option.props.children}
        />
      );
    });
  }

  radioButtons() {
    const filtered = this.filtered();
    const field = _get(this.props, 'field');
    if (filtered.length === 0) {
      return (
        <Alert>
          {_get(this.props.field, 'filter_norecords', 'No results')}
        </Alert>);
    }

    if (field.chunks) {
      const split = Math.ceil(filtered.length / field.chunks);
      const chunks = () => {
        const chunkData = _chunk(filtered, split);
        return _map(chunkData, (chunk, key) =>
          (
            <Col key={key}
                 md={Math.round(12 / field.chunks)}>
              {this.radioButtonList(chunk)}
            </Col>
          )
        );
      };
      return (<Row>{chunks()}</Row>);
    }

    return this.radioButtonList(filtered);
  }


  searchBox() {
    let disabled = false;
    if (this.props.field && this.props.field.disabled && _isFunction(this.props.field.disabled)) {
      disabled = this.props.context.checkCondition(this.props.field.disabled());
    }

    if ((this.props.field.searchable || this.props.field.filter) && !this.props.field.static && !this.props.context.isStatic) {
      return (<input
        type="text"
        disabled={disabled}
        placeholder={_get(this.props.field, 'filter_placeholder', _get(this.props.field.locale, 'filter.placeholder', 'Filter'))}
        defaultValue={this.state.value}
        onKeyDown={this.handlePrevent}
        onKeyUp={this.handleChange}
        className="form-control"
      />);
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.searchBox()}
        {this.radioButtons()}
      </div>
    );
  }
}

RadioBinder.propTypes = {
  field: PropTypes.object,
  input: PropTypes.object,
  context: PropTypes.object,
};

const Binder = (props) => (
  <AppContext.Consumer>
    {(context) => <RadioBinder context={context} {...props} />}
  </AppContext.Consumer>);

export default Binder;



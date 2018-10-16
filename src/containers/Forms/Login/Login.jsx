import React, {Component} from 'react';
import Form from '../../../modules/final-form/Form';
import Button from '../../../modules/final-form/Bootstrap4/Button';
import Input from '../../../modules/final-form/Bootstrap4/Input';
import Message from '../../../modules/final-form/Bootstrap4/Message';
// import PropTypes from 'prop-types';

class Login extends Component {
  render() {

    const size = {
      labelSize: {xs: 3},
      fieldSize: {xs: 9}
    };

    const validate = (values) => {
      const errors = {};
      if (!values.username || values.username === '') errors.username = 'The username is mandatory';
      if (!values.password || values.password === '') errors.password = 'The password is mandatory';
      return errors;
    };

    const handleSubmit = () => {
      return ({username: 'Oopsie, serverside error'});
    };

    return (
      <div>
        <h2>
          Login Form
        </h2>
        <Form
          debug
          validate={validate}
          onSubmit={handleSubmit}

        >
          <Input label="Username" placeholder="email" name={'username'} type={'text'} {...size} />
          <Input label="Password" placeholder="password" name={'password'} type={'password'} {...size} />

          <Message type={'error'}>Oopsie, we ould not verify your account.</Message>
          <Message type={'success'}>Welcome, we will redirect you shortly.</Message>
          <Button type={'submit'}>Send</Button>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {};
Login.defaultProps = {};

export default Login;
import React, {Component} from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from '../../../modules/final-form/Form';
import Button from '../../../modules/final-form/Bootstrap4/Button';
import Input from '../../../modules/final-form/Bootstrap4/Input';
import Select from '../../../modules/final-form/Bootstrap4/Select';
import Radio from '../../../modules/final-form/Bootstrap4/Radio';
import Checkbox from '../../../modules/final-form/Bootstrap4/Checkbox';
import DateTime from '../../../modules/final-form/Bootstrap4/DateTime';
import Dropdown from '../../../modules/final-form/Bootstrap4/Dropdown';
import Plupload from '../../../modules/final-form/Bootstrap4/Plupload';
import TinyMce from '../../../modules/final-form/Bootstrap4/TinyMce';
import ComplexRow from '../../../modules/final-form/Bootstrap4/ComplexRow';
import Complex from '../../../modules/final-form/Bootstrap4/Complex';
// import PropTypes from 'prop-types';

class Register extends Component {
  render() {

    const size = {
      labelSize: {xs: 3},
      fieldSize: {xs: 9}
    };

    const sizeComplex = {
      fieldSize: { xs: 12 }
    };

    return (
      <div>
        <h2>
          Registration Form
        </h2>
        <p>
          This form demonstrates a form with field arrays.
          here you can add multiple domestic pets and children.
        </p>
        <Form debug>
          <Input label="Username" placeholder="email" name={'username'} type={'text'} {...size} />
          <Input label="Password" placeholder="password" name={'password'} type={'password'} {...size} />

          <Input label="Firstname" placeholder="Firstname" name={'firstname'} type={'text'} {...size} />
          <Input label="Lastname" placeholder="Lastname" name={'lastname'} type={'text'} {...size} />

          <Select label="Favorite Color"  name={'color'} {...size} >
            <option value={'1'}>White</option>
            <option value={'2'}>Black</option>
            <option value={'3'}>Red</option>
            <option value={'4'}>Pink</option>
            <option value={'5'}>Green</option>
            <option value={'6'}>Brown</option>
            <option value={'7'}>Grey</option>
          </Select>
          <Checkbox label="Favorite food" name={'colorCB'} {...size} >
            <option value={'1'}>pizza</option>
            <option value={'2'}>patat</option>
            <option value={'3'}>pasta</option>
            <option value={'4'}>steak</option>
            <option value={'5'}>burger</option>
            <option value={'6'}>chicken</option>
            <option value={'7'}>fish</option>
          </Checkbox>
          <Radio label="Favorite season" name={'colorRadio'} {...size} >
            <option value={'1'}>Winter</option>
            <option value={'2'}>Spring</option>
            <option value={'3'}>Summer</option>
            <option value={'4'}>Fall</option>
          </Radio>
          <DateTime label="Date of birth" name={'date-time'} {...size}/>
          <Dropdown label="Drop down" name={'dropdown'} {...size}>
            <option value={'1'} selected>White</option>
            <option value={'2'}>Black</option>
            <option value={'3'}>Red</option>
            <option value={'4'}>Pink</option>
            <option value={'5'}>Green</option>
            <option value={'6'}>Brown</option>
            <option value={'7'}>Grey</option>
          </Dropdown>
          <Plupload name="plupload" label={'Upload'} {...size} conf={{id: 'plupload'}}/>
          <h2 className={'mb-1'}>Do you have pets?</h2>
          <ComplexRow
            label={'Domestic pets'}
            name={"kids"}
            {...size}
            left={{ xs: 9 }}
            right={{ xs: 3 }}
            moveBtn={{variant: 'secondary'}}
            removeBtn={{variant: 'danger'}}
            render={name => (
              <Row>
                <Col xs={6}>
                  <Input
                    placeholder="Name"
                    name={`${name}.name`}
                    type={"text"}
                    {...sizeComplex}
                  />
                </Col>
                <Col xs={6}>
                  <Input
                    placeholder="Age"
                    name={`${name}.age`}
                    type={"number"}
                    {...sizeComplex}
                  />
                </Col>
              </Row>
            )}
          />

          <h2 className={'mb-1'}>Do you have children?</h2>
          <Complex
            label={'Children'}
            name={"something-else"}
            {...size}
            left={{ xs: 9 }}
            right={{ xs: 3 }}
            moveBtn={{variant: 'secondary', size: 'sm'}}
            removeBtn={{variant: 'danger', size: 'sm'}}
            render={name => (
              <Row>
                <Col xs={6}>
                  <Input
                    placeholder="Name"
                    name={`${name}.name`}
                    type={"text"}
                    {...sizeComplex}
                  />
                </Col>
                <Col xs={6}>
                  <Input
                    placeholder="Age"
                    name={`${name}.age`}
                    type={"number"}
                    {...sizeComplex}
                  />
                </Col>
              </Row>
            )}
          />

          <TinyMce name={'tiny'} label={'tiny'} {...size} />
          <Button type={'button'}>Send</Button>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {};
Register.defaultProps = {};

export default Register;
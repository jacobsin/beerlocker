import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getAll} from '../selectors';
import PhoneItem from './PhoneItem';


const PhoneList = ({phones}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">

          Search: <input/>
          Sort by:
          <select>
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
            <option value="-age">Oldest</option>
          </select>

        </div>
        <div className="col-md-10">

          <ul className="phones">
            {phones.items.map(i =>
              <PhoneItem phone={i} key={i.id}/>)
            }
          </ul>

        </div>
      </div>
    </div>
  );
};

PhoneList.propTypes = {
  phones: PropTypes.object.isRequired
};

export default connect(
  createStructuredSelector({phones: getAll})
)(PhoneList);

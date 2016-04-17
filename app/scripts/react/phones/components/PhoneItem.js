import React, {PropTypes} from 'react';

const PhoneItem = ({phone}) => {
  return (
    <li className="thumbnail">
      <a href={`#/phones/${phone.id}`} className="thumb">
        <img src={phone.imageUrl} />
      </a>
      <a href={`#/phones/${phone.id}`}>{phone.name}</a>
      <p>{phone.snippet}</p>
    </li>
  );
};

PhoneItem.propTypes = {
  phone: PropTypes.object.isRequired
};

export default PhoneItem;

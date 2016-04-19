import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getSearchText, getFilteredItems } from '../selectors';
import { search } from '../actions';
import PhoneItem from './PhoneItem';
import SearchBar from './SearchBar';


const PhoneList = ({searchText, filteredItems, onUserInput}) => {
  return (
    <div className="container-fluid">
      <div className="row">

        <SearchBar query={searchText} onUserInput={onUserInput}/>

        <div className="col-md-10">

          <ul className="phones">
            {filteredItems.map(i =>
              <PhoneItem phone={i} key={i.id}/>)
            }
          </ul>

        </div>
      </div>
    </div>
  );
};

PhoneList.propTypes = {
  searchText: PropTypes.string.isRequired,
  filteredItems: PropTypes.array.isRequired,
  onUserInput: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUserInput: (searchText, sortOrder) => dispatch(search(searchText, sortOrder))
  };
};

export default connect(
  createStructuredSelector({searchText: getSearchText, filteredItems: getFilteredItems}),
  mapDispatchToProps
)(PhoneList);

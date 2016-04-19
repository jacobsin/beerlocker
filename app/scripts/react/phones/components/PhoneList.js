import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getSearchText, getFilteredItems } from '../selectors';
import { search } from '../actions';
import PhoneItem from './PhoneItem';
import SearchBar from './SearchBar';


const PhoneList = ({searchText, filteredItems, dispatch}) => {
  return (
    <div className="container-fluid">
      <div className="row">

        <SearchBar query={searchText} onUserInput={(searchText)=>dispatch(search(searchText))}/>

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
  dispatch: PropTypes.func.isRequired
};

export default connect(
  createStructuredSelector({searchText: getSearchText, filteredItems: getFilteredItems})
)(PhoneList);

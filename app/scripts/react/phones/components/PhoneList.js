import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getSearchText, getSortOrder, getFilteredItems } from '../selectors';
import { search, fetchAll } from '../actions';
import PhoneItem from './PhoneItem';
import SearchBar from './SearchBar';


class PhoneList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    const {searchText, sortOrder, filteredItems, onUserInput} = this.props;
    return (
      <div className="container-fluid">
        <div className="row">

          <SearchBar query={searchText} sortOrder={sortOrder} onUserInput={onUserInput}/>

          <div className="col-md-10">

            <ul className="phones">
            {filteredItems.map(i =>
              <PhoneItem phone={i} key={i.id}/>
            )}
            </ul>

          </div>
        </div>
      </div>
    );
  }
}

PhoneList.propTypes = {
  searchText: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  filteredItems: PropTypes.array.isRequired,
  onUserInput: PropTypes.func.isRequired,
  fetchAll: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUserInput: (searchText, sortOrder) => dispatch(search(searchText, sortOrder)),
    fetchAll: () => dispatch(fetchAll())
  };
};

export default connect(
  createStructuredSelector({searchText: getSearchText, sortOrder: getSortOrder, filteredItems: getFilteredItems}),
  mapDispatchToProps
)(PhoneList);

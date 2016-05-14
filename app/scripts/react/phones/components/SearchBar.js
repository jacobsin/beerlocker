import React, { PropTypes } from 'react';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange() {
    this.props.onUserInput(
      this.refs.searchTextInput.value,
      this.refs.sortOrderInput.value
    );
  }

  render() {
    const {searchText, sortOrder} = this.props;
    return (
      <div className="sidebar col-md-2">

        Search: <input ref="searchTextInput" className="search" value={searchText} onChange={this.handleChange}/>
        Sort by:
        <select ref="sortOrderInput" className="sort-by" value={sortOrder} onChange={this.handleChange}>
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
          <option value="-age">Oldest</option>
        </select>

      </div>
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string,
  sortOrder: PropTypes.string,
  onUserInput: PropTypes.func.isRequired
};

export default SearchBar;

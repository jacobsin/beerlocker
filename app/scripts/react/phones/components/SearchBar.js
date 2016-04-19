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
    const {searchText} = this.props;
    return (
      <div className="col-md-2">

        Search: <input ref="searchTextInput" value={searchText} onChange={this.handleChange}/>
        Sort by:
        <select ref="sortOrderInput" onChange={this.handleChange}>
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
  onUserInput: PropTypes.func.isRequired
};

export default SearchBar;

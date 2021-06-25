import React from "react";
import * as JobServices from "../../services/jobServices";

class JobSearch extends React.Component {
  constructor(props) {
    super(props);
    // seting state to equal the input field so right now it's an empty string
    this.state = {
      searchValue: "",
    };
  }
  // taking the event of typing something in
  searchHandler = (e) => {
    const value = e.currentTarget.value;
    // set the value we placed in the input field and overriding the empty string
    this.setState((prevState) => {
      return { ...prevState, searchValue: value };
    });
  };

  searchSubmitHandler = () => {
    const searchTerm = this.state.searchValue;

    JobServices.search(searchTerm)
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };

  onSearchSuccess = (res) => {
    //on successful call from axios call, assign it to a variable
    let found = res.data.item.pagedItems;
    // pass the object to parent through the parent's property called query
    this.props.query(found);
  };

  onSearchError = (res) => {
    console.error(res);
  };

  render() {
    return (
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="search"
          value={this.state.search}
          onChange={this.searchHandler}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.searchSubmitHandler}
        >
          Search
        </button>
      </form>
    );
  }
}

export default JobSearch;

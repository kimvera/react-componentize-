import React from "react";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import JobSearch from "./JobSearch";
import * as jobServices from "../../services/jobServices";

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    };
  }

  componentDidMount = () => {
    jobServices.getAll().then(this.onGetAllSuccess).catch(this.onGetAllError);
  };

  onGetAllSuccess = (res) => {
    const jobs = res.data.item.pagedItems;
    // here we are setting a new state with the objects we got from the successful axios call
    this.setState(() => {
      return { ...this.state.jobs, jobs };
      // by copying this.state.jobs (which was an empty array at first), we're overriding that with jobs : res.data.item.pagedItems
    });
  };

  onGetAllError = (res) => {
    console.error(res);
  };
  // gets passed the object through
  onEdit = (job) => {
    this.props.history.push(`/jobs/edit/${job.id}`, {
      type: "TO_EDIT_JOB",
      payload: job,
    });
  };
  //
  onDelete = (job) => {
    console.log(job);
    jobServices.erase(job).then(this.onEraseSuccess).catch(this.onEraseError);
  };

  onEraseSuccess = (res) => {
    console.log(res);
    let deleteJob = res.data.item;

    this.setState((prevState) => {
      const jobs = [...prevState.jobs];
      const indexOfJob = jobs.findIndex((job) => job.id === deleteJob.id);

      if (indexOfJob >= 0) {
        jobs.splice(indexOfJob, 1);
      }
      return { jobs };
    });
  };

  onEraseError = (res) => {
    console.error(res);
  };

  // through this function, we pass it a payload (the objects that were found in search) and set the state
  onJobSearch = (payload) => {
    this.setState((prevState) => {
      return { ...prevState, jobs: payload };
      // so that it renders just the cards of objects
    });
  };

  render() {
    return (
      <div className="container">
        <nav
          className="navbar justify-content-between"
          style={{ margin: "1rem 0rem" }}
        >
          <div>
            <Link to="/jobs/new" className="btn btn-outline-primary">
              + Job
            </Link>
          </div>
          <div>
            {/* the parent accepts the payload from the child component through a function  */}
            <JobSearch query={this.onJobSearch} />
          </div>
        </nav>
        <div
          className="row justify-content-between"
          style={{ marginRight: "10px" }}
        >
          {/* we are mapping out jobs which was previously filled through our axios call */}
          {this.state.jobs.map((job) => {
            return (
              <JobCard
                key={job.id}
                jobs={job}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Jobs;

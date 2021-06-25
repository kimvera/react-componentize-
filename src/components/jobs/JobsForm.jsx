import React from "react";
import * as jobServices from "../../services/jobServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class JobForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobData: {
        title: "",
        description: "",
        summary: "",
        pay: parseInt(0),
        slug: "",
        statusId: "Active",
        techCompanyId: "",
        skills: [""],
      },
    };
  }

  componentDidMount = () => {
    // when component mounts, if there is a "this.props.location.state with a payload", assign that to a variable called payload
    let payload = this.props.location.state?.payload;
    // if there is a payload (if payload is true), then run this function with the parameters of payload
    if (payload) {
      this.setFormData(payload);
    }
  };

  // this function takes the parameter of payload
  setFormData = (payload) => {
    //we're setting the payload to this.state because we already binded the input values of the form into state.
    this.setState((prevState) => {
      // So here we're taking prevState and copying prevState and assigning the value of jobData to a copied ver of payload
      return { ...prevState, jobData: { ...payload } };
    });
  };

  handleChange = (e) => {
    let currentTarget = e.currentTarget;
    let value = currentTarget.value;
    let name = currentTarget.name;

    this.setState(() => {
      const jobData = { ...this.state.jobData };
      jobData[name] = value;

      return { jobData };
    });
  };
  // when submitting the form
  submitForm = (e) => {
    // prevents the default nature of button
    e.preventDefault();
    // ternary question of is this a  "this.props.location.state.payload?" if true, update, if false, create
    this.props.location.state.payload ? this.update() : this.create();
  };
  // function for calling a POST call with this.state.jobData (which should hold newly created values)
  create = () => {
    jobServices
      .create(this.state.jobData)
      .then(this.onCreateSuccess)
      .catch(this.onCreateError);
  };

  onCreateSuccess = (_response) => {
    toast.success("You have successfully created a job posting!", {
      hideProgressBar: true,
    });
    // should push to the page where it is rendered
    this.props.history.push("/jobs");
  };

  onCreateError = (response) => {
    console.error(response);
    toast.error("Please try again.", {
      hideProgressBar: true,
    });
  };
  // this function places a PUT call for newly updated information
  update = () => {
    jobServices
      .update(this.state.jobData)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };

  onUpdateSuccess = (res) => {
    console.log(res);
    this.props.history.push("/jobs");
  };

  onUpdateError = (res) => {
    console.error(res);
  };

  render() {
    return (
      <div className="container">
        <form className="submitForm" onSubmit={this.submitForm}>
          <div className="row" style={{ marginTop: "1rem" }}>
            <h3>Add a Job</h3>
          </div>
          <div className="form-group">
            <label htmlFor="title" className="font-weight-bold">
              Position
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Hiring Position"
              value={this.state.jobData.title}
              onChange={this.handleChange}
            />
          </div>
          <select
            className="form-select form-select-lg mb-3"
            name="techCompanyId"
            value={this.state.jobData.techCompanyId}
            onChange={this.handleChange}
          >
            <option value="">Select a Company</option>
            <option value="24646">Microsoft</option>
            <option value="24643">Google</option>
            <option value="24645">Apple</option>
            <option value="24644">Facebook</option>
            <option value="24642">Amazon</option>
          </select>
          <div className="form-group">
            <label htmlFor="description" className="font-weight-bold">
              Job Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Description about position"
              value={this.state.jobData.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary" className="font-weight-bold">
              Job Location
            </label>
            <input
              type="text"
              className="form-control"
              name="summary"
              placeholder="Job Location"
              value={this.state.jobData.summary}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pay" className="font-weight-bold">
              Pay
            </label>
            <input
              type="number"
              className="form-control"
              name="pay"
              placeholder="Salary"
              value={this.state.jobData.pay}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills" className="font-weight-bold">
              Skills
            </label>
            <input
              type="text"
              className="form-control"
              name="skills"
              placeholder="Skills Requirement"
              value={this.state.jobData.skills}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="slug" className="font-weight-bold">
              Slug
            </label>
            <input
              type="text"
              className="form-control"
              name="slug"
              placeholder="email"
              value={this.state.jobData.slug}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default JobForms;

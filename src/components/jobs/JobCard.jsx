import React from "react";

// need the props as a parameter of JobCard because we're using this as a functional component that is passed
// properties through Jobs (its parent component)

export default function JobCard(props) {
  // here we're assigning a value called job which is a property called jobs in the parent component
  // parent component has passed its value by creating a property named jobs={job}

  const job = props.jobs;
  // passing through the card object of specific job
  const editButton = () => {
    props.onEdit(job);
  };

  const deleteButton = () => {
    props.onDelete(job);
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src="" alt="job posting" />
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text">{job.summary}</p>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginRight: "5px" }}
          onClick={editButton}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

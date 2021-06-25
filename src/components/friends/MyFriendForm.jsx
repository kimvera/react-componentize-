import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as friendServices from "./../../services/friendServices";

const basicSchema = Yup.object().shape({
  title: Yup.string().min(2).max(100).required(),
  bio: Yup.string().min(2).max(100).required(),
  summary: Yup.string().min(2).max(100).required(),
  headline: Yup.string().min(2).max(100).required(),
  slug: Yup.string().email().required(),
  primaryImage: Yup.string().min(2).max(225).required(),
});

class MyFriendForm extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "Active",
      primaryImage: "",
      userId: "hardcode",
    },
  };

  handleSubmit = (values) => {
    this.props.location.state ? this.update() : this.register(values);
  };

  register = (values) => {
    friendServices
      .register(values)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterSuccess = (_response) => {
    this.props.history.push("/friends");
  };

  onRegisterError = (response) => {
    console.error({ error: response });
  };

  //repopulating form
  componentDidMount = () => {
    let payload = this.props.location.state?.payload;

    if (payload) {
      this.setFormData(payload);
    }
  };

  setFormData = (friendInfo) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...friendInfo,
          primaryImage: friendInfo.primaryImage.imageUrl,
        },
      };
    });
  };

  update = () => {
    friendServices
      .update(this.state.formData)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };

  onUpdateSuccess = (response) => {
    console.log(response);
    this.props.history.push("/friends");
  };

  onUpdateError = (response) => {
    console.error(response);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Formik
              enableReinitialize={true}
              initialValues={this.state.formData}
              validationSchema={basicSchema}
              onSubmit={this.handleSubmit}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="title">Full Name</label>
                  <Field
                    type="text"
                    name="title"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="title" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <Field
                    type="text"
                    name="bio"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="bio" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="summary">Summary</label>
                  <Field
                    type="text"
                    name="summary"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="summary" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="headline">Headline</label>
                  <Field
                    type="text"
                    name="headline"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="headline" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="slug">Email Address</label>
                  <Field
                    type="email"
                    name="slug"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="slug" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="primaryImage">Avatar Url</label>
                  <Field
                    type="text"
                    name="primaryImage"
                    className="form-control"
                  ></Field>
                  <ErrorMessage name="primaryImage" component="div" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default MyFriendForm;

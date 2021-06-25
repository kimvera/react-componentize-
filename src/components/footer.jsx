import React from "react";

import debug from "sabio-debug";
const _logger = debug.extend("footer");

class Footer extends React.Component {
  componentDidMount = () => {
    _logger("rendering");
  };

  render() {
    return (
      <React.Fragment>
        <p style={{ marginLeft: "3rem" }}>&copy; Sabio 2019-2020</p>;
      </React.Fragment>
    );
  }
}

export default Footer;

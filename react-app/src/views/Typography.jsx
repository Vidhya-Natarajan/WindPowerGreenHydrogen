
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

class Typography extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="The Page under Construction"

              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Typography;

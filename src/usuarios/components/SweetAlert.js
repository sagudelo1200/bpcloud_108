import React from "react";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";

// reactstrap components
import { Button, Card, CardBody, CardText, Row, Col } from "reactstrap";

const SweetAlert = () => {
  const [alert, setAlert] = React.useState(null);
  // to stop the warning of calling setState of unmounted component
  React.useEffect(() => {
    return function cleanup() {
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  
  const successAlert = () => {
    setAlert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Good job!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        btnSize=""
      >
        You clicked the button!
      </ReactBSAlert>
    );
  };
  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <>
      <div className="content">
        {alert}
        <div className="places-sweet-alerts">
          <Row className="mt-5">
            <Col className="mr-auto" md="3">
              <Card>
                <CardBody className="text-center">
                  <CardText>A success message</CardText>
                  <Button
                    className="btn-fill"
                    color="info"
                    onClick={successAlert}
                  >
                    Try me!
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default SweetAlert;

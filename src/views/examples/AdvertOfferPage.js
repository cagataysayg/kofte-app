import React from "react";
import { Button, Row, Col, Table } from "reactstrap";
import axios from "../../axios";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import { useHistory } from "react-router";

export default function LandingPage(props) {
  const { ilan } = props.match.params;
  const history = useHistory();
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const [data, setData] = React.useState({ offers: [] });
  console.log(data);

  React.useEffect(() => {
    axios.get(`myadverts/${ilan}`).then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png").default}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png").default}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png").default}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png").default}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png").default}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png").default}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-center align-items-center text-left">
              <Col className="text-center" lg="8" md="12">
                <h2 className="title mb-5">{data.title}</h2>
              </Col>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>İsim</th>
                    <th>Açıklama</th>
                    <th className="text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {data.offers.map((row, index) => (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        {row.user.name} {row.user.lastname}
                      </td>
                      <td>{row.description}</td>
                      <td className="text-right">
                        <Button
                          className="btn-icon btn-simple"
                          color="warning"
                          size="sm"
                          onClick={() => history.push(`../sohbet/${row._id}`)}
                        >
                          <i className="fa fa-comments" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

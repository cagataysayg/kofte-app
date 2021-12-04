import React from "react";
import { Button, Row, Col, Table } from "reactstrap";
import axios from "../../axios";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

export default function LandingPage() {
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get("offers").then((res) => {
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
                <h2 className="title mb-5">TEKLİFLERİM</h2>
              </Col>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Başlık</th>
                    <th>Açıklama</th>
                    <th className="text-center">Alıcı</th>
                    <th className="text-right">Bütçe</th>
                    <th className="text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td>Andrew Mike</td>
                      <td>Develop</td>
                      <td className="text-center">2013</td>
                      <td className="text-right">€ 99,225</td>
                      <td className="text-right">
                        <Button
                          className="btn-icon btn-simple"
                          color="success"
                          size="sm"
                        >
                          <i className="fa fa-edit"></i>
                        </Button>
                        {` `}
                        <Button
                          className="btn-icon btn-simple"
                          color="warning"
                          size="sm"
                        >
                          <i className="fa fa-comments" />
                        </Button>
                        {` `}
                        <Button
                          className="btn-icon btn-simple"
                          color="info"
                          size="sm"
                        >
                          <i className="fa fa-info"></i>
                        </Button>
                        {` `}
                        <Button
                          className="btn-icon btn-simple"
                          color="danger"
                          size="sm"
                        >
                          <i className="fa fa-times-circle"></i>
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

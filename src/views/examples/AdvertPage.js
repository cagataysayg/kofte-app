import React from "react";
import { Button, Row, Col, Table } from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import axios from "../../axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function LandingPage() {
  const history = useHistory();

  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get("myadverts").then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <>
      <ExamplesNavbar />
      {console.log(data)}
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
                <h2 className="title mb-5">İLANLARIM</h2>
              </Col>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Başlık</th>
                    <th className="text-right">Bütçe</th>
                    <th className="text-right">Teklifler</th>
                    <th className="text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td>{row.title}</td>
                      <td className="text-right">{row.budget} TL</td>
                      <td className="text-right">
                        <Button
                          className="btn-icon btn-simple"
                          color="success"
                          size="sm"
                          onClick={() => history.push(`teklifler/${row._id}`)}
                        >
                          <span>{row.offers.length}</span>
                        </Button>
                      </td>
                      <td className="text-right">
                        <Button
                          className="btn-icon btn-simple"
                          color="info"
                          size="sm"
                          onClick={() =>
                            history.push(`ilan-detaylari/${row._id}`)
                          }
                        >
                          <i className="fa fa-info"></i>
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

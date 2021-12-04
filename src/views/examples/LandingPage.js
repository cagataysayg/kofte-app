import React from "react";
import { Button, Row, Col, Table, Modal, Form, FormGroup, InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import axios from "../../axios";
import { Link } from "react-router-dom";
import classnames from "classnames";

export default function LandingPage() {
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get("adverts").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const [formModal, setFormModal] = React.useState(false);
  const [textFocus, setTextFocus] = React.useState(false);
  
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
            <Row id="modals">
              <Modal
                modalClassName="modal-black"
                isOpen={formModal}
                toggle={() => setFormModal(false)}
              >
                <div className="modal-header justify-content-center">
                  <button className="close" onClick={() => setFormModal(false)}>
                    <i className="tim-icons icon-simple-remove text-white" />
                  </button>
                  <div className="text-muted text-center ml-auto mr-auto">
                    <h3 className="mb-0">Teklif Ver</h3>
                  </div>
                </div>
                <div className="modal-body">
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup
                        className={classnames("input-group-alternative", {
                          "input-group-focus": textFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-double-right" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Teklifiniz"
                          type="number"
                          id="description"
                          onFocus={(e) => setTextFocus(true)}
                          onBlur={(e) => setTextFocus(false)}
                        />
                      </InputGroup>
                      <InputGroup
                        className={classnames("input-group-alternative", {
                          "input-group-focus": textFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-double-right" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Açıklama"
                          type="textarea"
                          onFocus={(e) => setTextFocus(true)}
                          onBlur={(e) => setTextFocus(false)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button className="my-4" color="success" type="button">
                        Teklif Ver
                      </Button>
                    </div>
                  </Form>
                </div>
              </Modal>
            </Row>
            <Row className="row-grid justify-content-center align-items-center text-left">
              <Col className="text-center" lg="8" md="12">
                <h2 className="title mb-5">İLANLAR</h2>
              </Col>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Başlık</th>
                    <th className="text-right">Bütçe</th>
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
                          onClick={() => setFormModal(true)}
                        >
                          <i className="fa fa-dollar-sign"></i>
                        </Button>
                        {` `}
                        <Button
                          className="btn-icon btn-simple"
                          color="warning"
                          size="sm"
                          to="/sohbet"
                          tag={Link}
                        >
                          <i className="fa fa-comments" />
                        </Button>
                        {` `}
                        <Button
                          className="btn-icon btn-simple"
                          color="info"
                          size="sm"
                          to="/ilan-detaylari"
                          tag={Link}
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

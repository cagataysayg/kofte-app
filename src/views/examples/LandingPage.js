import React from "react";
import {
  Button,
  Row,
  Col,
  Table,
  Modal,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Label,
} from "reactstrap";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import axios from "../../axios";
import { Link } from "react-router-dom";
import classnames from "classnames";
import cookies from "cookies";
import { useHistory } from "react-router";

export default function LandingPage() {
  const history = useHistory();
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const [data, setData] = React.useState({ data: [], offerData: {} });

  React.useEffect(() => {
    axios.get("adverts").then((res) => {
      setData({
        data: res.data.data,
        offerData: { is_cargo: false, spesifics: [] },
      });
    });
  }, []);

  const [formModal, setFormModal] = React.useState(false);
  const [textFocus, setTextFocus] = React.useState(false);
  const [descFocus, setDescFocus] = React.useState(false);
  const [files, setFiles] = React.useState(null);

  const addOffer = (self) => {
    axios.post("offers", data.offerData).then((res) => {
      if (files) {
        const formData = new FormData();
        formData.append("img", files);

        axios.post("upload/offer/" + res.data.data._id, formData).then(() => {
          history.push("tekliflerim");
        });
      } else {
        history.push("tekliflerim");
      }
    });
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    status === "done" && setFiles(file);
  };

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
                  <Form autoComplete="off" role="form">
                    <FormGroup className="mb-3">
                      <InputGroup
                        className={classnames("input-group-alternative", {
                          "input-group-focus": textFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>TL</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Teklifiniz"
                          type="number"
                          id="price"
                          onFocus={(e) => setTextFocus(true)}
                          onBlur={(e) => setTextFocus(false)}
                          onChange={(e) =>
                            setData({
                              ...data,
                              offerData: {
                                ...data.offerData,
                                price: Number(e.target.value),
                              },
                            })
                          }
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
                          id="description"
                          onFocus={(e) => setDescFocus(true)}
                          onBlur={(e) => setDescFocus(false)}
                          onChange={(e) =>
                            setData({
                              ...data,
                              offerData: {
                                ...data.offerData,
                                description: e.target.value,
                              },
                            })
                          }
                        />
                      </InputGroup>

                      <InputGroup
                        className={classnames("input-group-alternative", {
                          "input-group-focus": textFocus,
                        })}
                      >
                        <Dropzone
                          onChangeStatus={handleChangeStatus}
                          accept="image/*,audio/*,video/*"
                          multiple={false}
                        />
                      </InputGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setData({
                                ...data,
                                offerData: {
                                  ...data.offerData,
                                  is_cargo: !data.offerData.is_cargo,
                                },
                              });
                            }}
                          />
                          Kargo ile gönderebilirim
                          <span className="form-check-sign">
                            <span className="check"></span>
                          </span>
                        </Label>
                      </FormGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="success"
                        type="button"
                        onClick={(self) => addOffer(self)}
                      >
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
                  {data.data.map((row, index) => (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td>{row.title}</td>
                      <td className="text-right">{row.budget} TL</td>
                      <td className="text-right">
                        <Button
                          className="btn-icon btn-simple"
                          color="success"
                          size="sm"
                          onClick={() => {
                            setData({
                              ...data,
                              offerData: { ...data.offerData, advert: row._id },
                            });
                            setFormModal(true);
                          }}
                        >
                          <i className="fa fa-dollar-sign"></i>
                        </Button>
                        {` `}
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

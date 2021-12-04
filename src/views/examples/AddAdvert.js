import React, { useEffect } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import axios from "../../axios";
import { useHistory } from "react-router";

let ps = null;

export default function ProfilePage() {
  const history = useHistory();
  const [categories, setCategories] = React.useState([]);
  const [parent, setParent] = React.useState("");
  const [data, setData] = React.useState({
    title: "",
    description: "",
    budget: 0,
    category: "",
    is_cargo_accepts: false,
    specs: [{ spec: "", desc: "", mandatory: false }],
  });

  useEffect(() => {
    axios.get("admin74/category").then((res) => setCategories(res.data.data));
  }, []);

  const handleData = (e) => setData({ ...data, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("adverts", data).then(() => history.push("ilanlarim"));
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  }, []);
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <section className="section">
          <Container>
            <Row>
              <Col md="12">
                <Card className="card-plain">
                  <CardHeader>
                    <h1 className="profile-title text-left">İlan Ekle</h1>
                    <h5 className="text-on-back">
                      <i className="tim-icons icon-bag-16" />
                    </h5>
                  </CardHeader>
                  <CardBody>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Başlık</label>
                            <Input
                              placeholder="Başlık"
                              type="text"
                              value={data.title}
                              id="title"
                              onChange={handleData}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Bütçe</label>
                            <Input
                              placeholder="Bütçe"
                              type="number"
                              value={data.budget}
                              id="budget"
                              onChange={handleData}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="3">
                          <FormGroup>
                            <Label for="parent">Kategori</Label>
                            <Input
                              type="select"
                              value={parent}
                              id="parent"
                              onChange={(e) => setParent(e.target.value)}
                            >
                              <option></option>
                              {categories
                                .filter((ct) => !ct.parent_category)
                                .map((ct) => (
                                  <option value={ct._id}>{ct.title}</option>
                                ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <Label for="category">Alt Kategori</Label>
                            <Input
                              type="select"
                              value={data.category}
                              id="category"
                              onChange={handleData}
                            >
                              <option></option>
                              {categories
                                .filter((ct) => ct.parent_category === parent)
                                .map((ct) => (
                                  <option value={ct._id}>{ct.title}</option>
                                ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Açıklama</label>
                            <Input
                              placeholder="Açıklamayı buraya giriniz"
                              type="textarea"
                              value={data.description}
                              id="description"
                              onChange={handleData}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {data.specs.map((row, rowIndex) => (
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <label>Özellik</label>
                              <Input
                                type="text"
                                value={row.spec}
                                onChange={(e) => {
                                  handleData({
                                    target: {
                                      id: "specs",
                                      value: [...data.specs].map(
                                        (spec, specIndex) =>
                                          rowIndex === specIndex
                                            ? { ...spec, spec: e.target.value }
                                            : spec
                                      ),
                                    },
                                  });
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <label>Açıklama</label>
                              <Input
                                type="text"
                                value={row.desc}
                                onChange={(e) => {
                                  handleData({
                                    target: {
                                      id: "specs",
                                      value: [...data.specs].map(
                                        (spec, specIndex) =>
                                          rowIndex === specIndex
                                            ? { ...spec, desc: e.target.value }
                                            : spec
                                      ),
                                    },
                                  });
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="2" className="d-flex align-items-center">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  checked={row.mandatory}
                                  onClick={(e) =>
                                    handleData({
                                      target: {
                                        id: "specs",
                                        value: [...data.specs].map(
                                          (spec, specIndex) =>
                                            rowIndex === specIndex
                                              ? {
                                                  ...spec,
                                                  mandatory: e.target.checked,
                                                }
                                              : spec
                                        ),
                                      },
                                    })
                                  }
                                />
                                Zorunlu
                                <span className="form-check-sign">
                                  <span className="check"></span>
                                </span>
                              </Label>
                            </FormGroup>
                          </Col>
                          <Col md="2" className="d-flex align-items-center">
                            {data.specs.length !== 1 && (
                              <Button
                                onClick={() => {
                                  let newData = [];
                                  data.specs.forEach(
                                    (dataRow, dataRowIndex) => {
                                      rowIndex !== dataRowIndex &&
                                        newData.push(dataRow);
                                    }
                                  );
                                  handleData({
                                    target: {
                                      id: "specs",
                                      value: newData,
                                    },
                                  });
                                }}
                                color="danger"
                                size="sm"
                              >
                                <i className="tim-icons icon-simple-remove" />
                              </Button>
                            )}
                            {rowIndex === data.specs.length - 1 && (
                              <Button
                                onClick={() => {
                                  handleData({
                                    target: {
                                      id: "specs",
                                      value: [
                                        ...data.specs,
                                        { spec: "", desc: "" },
                                      ],
                                    },
                                  });
                                }}
                                color="success"
                                size="sm"
                              >
                                <i className="tim-icons icon-simple-add" />
                              </Button>
                            )}
                          </Col>
                        </Row>
                      ))}
                      <Row>
                        <Col md="12">
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" />
                              <span className="form-check-sign" />
                              Kargo olarak gönderilebilir
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="submit"
                      >
                        Yayınla
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  );
}

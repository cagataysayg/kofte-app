import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

let ps = null;

export default function ProfilePage() {
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
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  },[]);
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <section className="section">
          <Container>
            <Row>
              <Col md="6">
                <Card className="card-plain">
                  <CardHeader>
                    <h1 className="profile-title text-left">Bize Ulaş</h1>
                    <h5 className="text-on-back">
                    <i className="tim-icons icon-chat-33" />
                    </h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Ad</label>
                            <Input placeholder="Ad" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>E-Posta</label>
                            <Input placeholder="ornek@ornekmail.com" type="email" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Mesaj</label>
                            <Input placeholder="Mesajınızı buraya giriniz" type="textarea" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                      >
                        Gönder
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto" md="4">
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-square-pin" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Adres</h4>
                    <p>
                      Hasan Ferdi Turgutlu <br />
                      Teknoloji Fakültesi <br />
                      Manisa / Türkiye
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-mobile" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Telefon</h4>
                    <p>
                      +90 123 456 7890
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  );
}

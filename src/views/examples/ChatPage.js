import React from "react";
import { Button, Row, Col, Form, FormGroup, InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import axios from "../../axios";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ChatBubble, BubbleGroup, Message } from "react-chat-ui";

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
            <Row >
              <Col className="col-md-6 offset-3">
                <div className="container">
                  <BubbleGroup
                    messages={[
                      new Message({ id: 1, message: "Hey!" }),
                      new Message({ id: 1, message: "I forgot to mention..." }),
                      new Message({
                        id: 1,
                        message:
                          "Oh no, I forgot... I think I was going to say I'm a BubbleGroup"
                      })
                    ]}
                    id={1}
                    showSenderName={true}
                    senderName={"KÖFTE Sohbet Ekranı"}
                  />
                  <ChatBubble
                    message={new Message({ id: 2, message: "I 'm a single ChatBubble!" })}
                  />
                  <BubbleGroup
                    messages={[
                      new Message({ id: 0, message: "How could you forget already?!" }),
                      new Message({
                        id: 0,
                        message: "Oh well. I'm a BubbleGroup as well"
                      })
                    ]}
                    id={1}
                    showSenderName={true}
                    senderName={"Elon Musk"}
                  />
                </div>
                <Form role="form">
                    <FormGroup >
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
                          placeholder="Mesajınız"
                          type="text"
                          onFocus={(e) => setTextFocus(true)}
                          onBlur={(e) => setTextFocus(false)}
                        />
                      </InputGroup>
                      <div className="text-center">
                      <Button  color="success" type="button">
                        Gönder
                      </Button>
                    </div>
                    </FormGroup>
                  </Form>
              </Col>
            </Row>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

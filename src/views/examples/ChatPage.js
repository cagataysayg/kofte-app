import React from "react";
import {
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import axios from "../../axios";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ChatBubble, BubbleGroup, Message } from "react-chat-ui";

export default function LandingPage(props) {
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const [data, setData] = React.useState({ messages: [] });
  const [sendMessage, setSendMessage] = React.useState("");

  const getData = () => {
    axios.get(`messages/${props.match.params.offer}`).then((res) => {
      setData(res.data);
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    axios
      .post(`messages/${props.match.params.offer}`, { message: sendMessage })
      .then(() => {
        setSendMessage("");
        getData();
      });
  };

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
            <Row>
              <Col className="col-md-6 offset-3">
                <div className="container">
                  KÖFTE Sohbet Ekranı
                  <br />
                  <br />
                  {data.messages.map((message, index) => (
                    <ChatBubble
                      key={"adasd-" + index}
                      message={
                        new Message({
                          id: data.me === message.user ? 0 : 1,
                          message: message.message,
                        })
                      }
                    />
                  ))}
                </div>
                <Form autoComplete="off" onSubmit={handleSend} role="form">
                  <FormGroup>
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
                        value={sendMessage}
                        onChange={(e) => setSendMessage(e.target.value)}
                      />
                    </InputGroup>
                    <div className="text-center">
                      <Button color="success" type="submit">
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

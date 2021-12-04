import React from "react";
import classnames from "classnames";
import PerfectScrollbar from "perfect-scrollbar";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "../../axios";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

let ps = null;

export default function ProfilePage(props) {
  const [tabs, setTabs] = React.useState(1);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(`adverts/${props.match.params.ilan}`).then((res) => {
      setData(res.data.data);
    });
  }, []);

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
  return !data ? (
    <></>
  ) : (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png").default}
          />
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png").default}
          />
          <Container className="align-items-center">
            <Row>
              <Col lg="12" md="12">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <h4 className="title">{data.title}</h4>
                  </CardHeader>
                  <CardBody>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab2"}
                    >
                      <TabPane tabId="tab2">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">
                                Açıklama: {data.description}
                              </th>
                            </tr>
                          </thead>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">
                                BÜTÇE: {data.budget} TL
                              </th>
                            </tr>
                          </thead>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">
                                KARGO KABUL EDİYO MU?:{" "}
                                {data.is_cargo_accepts ? "Evet" : "Hayır"}
                              </th>
                            </tr>
                          </thead>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">ÖZELLİKLER;</th>
                            </tr>
                          </thead>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Özellik</th>
                              <th className="header">Açıklama</th>
                              <th className="header">Zorunlu?</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.specs.map((spec) => (
                              <tr>
                                <td>{spec.spec}</td>
                                <td>{spec.desc}</td>
                                <td>{spec.mandatory ? "Evet" : "Hayır"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

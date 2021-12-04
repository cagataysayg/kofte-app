/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import cookies from "../../cookies";
import { useHistory } from "react-router";

export default function ExamplesNavbar() {
  const history = useHistory();
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  const [auth, setAuth] = React.useState(cookies.get("accessToken"));

  const handleAuth = () => {
    setAuth(cookies.get("accessToken"));
  };

  const handleExit = () => {
    cookies.remove("accessToken");
    ["/ilanlarim", "/tekliflerim"].includes(window.location.pathname) &&
      history.push("anasayfa");
    handleAuth();
  };

  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/anasayfa" id="navbar-brand" tag={Link}>
            <span>KÖFTE • </span>
            Tersine Satış
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            :)
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  KÖFTE
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/anasayfa">
                Anasayfa
              </NavLink>
            </NavItem>
            {auth && (
              <>
                <NavItem>
                  <NavLink to="/ilanlarim" tag={Link}>
                    İlanlarım
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/tekliflerim" tag={Link}>
                    Tekliflerim
                  </NavLink>
                </NavItem>
              </>
            )}
            <NavItem>
              <NavLink to="/hakkimizda" tag={Link}>
                Hakkımızda
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/bize-ulas" tag={Link}>
                Bize Ulaş
              </NavLink>
            </NavItem>
            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="primary"
                to="/ilan-ekle"
                tag={Link}
              >
                İlan Ekle
              </Button>
            </NavItem>
            {!auth ? (
              <NavItem>
                <Button
                  className="nav-link d-none d-lg-block"
                  color="info"
                  to="/giris"
                  tag={Link}
                >
                  Giriş Yap
                </Button>
              </NavItem>
            ) : (
              <NavItem>
                <Button
                  className="nav-link d-none d-lg-block"
                  color="danger"
                  onClick={handleExit}
                >
                  Çıkış Yap
                </Button>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

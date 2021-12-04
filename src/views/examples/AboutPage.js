import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import {
  Container,
  Row,
  Col,
  UncontrolledCarousel,
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

const carouselItems = [
  {
    src: require("assets/img/1.jpg").default,
    altText: "Slide 1",
  },
  {
    src: require("assets/img/2.jpg").default,
    altText: "Slide 2",
  },
  {
    src: require("assets/img/4.jpg").default,
    altText: "Slide 3",
  },
];

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
        <div className="page-header">
        <section className="section">
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
          <Container>
            <Row className="justify-content-between">
              <Col md="6">
                <Row className="justify-content-between align-items-center">
                  <UncontrolledCarousel items={carouselItems} />
                </Row>
              </Col>
              <Col md="5">
                <h1 className="profile-title text-left">Biz Kimiz</h1>
                <h5 className="text-on-back"><i className="tim-icons icon-world" /></h5>
                <p className="profile-description text-left">
                  Çağatay Saygın<br /> Kadir Baştimar<br /> Baran Acar<br /> Hackathon yarışma projesi.
                </p>
              </Col>
            </Row>
          </Container>
          </section>
        </div>
        <section className="section">
        <Container>
            <Row className="justify-content-between">
            <Col md="5">
                <h1 className="profile-title text-left">Ne Yapıyoruz?</h1>
                <h5 className="text-on-back"><i className="tim-icons icon-world" /></h5>
                <p className="profile-description text-left">
                &emsp;&emsp;Kofte, İstediği ürünü ararken vakit kaybetmek istemeyen ve aradığı özel ürünü bulamayan 
kullanıcıların ilan oluşturduğu, elinde ilana uygun ürünü olan kullanıcların satış teklifi 
oluşturabildiği platformdur.<br />

&emsp;&emsp;Uygulama içerisinde mesajlaşma özelliği vardır. Aradığınız ürünü, başka bir kulllanıcı size
satmak isterse satmak istediği fiyat ile birlikte size teklif gönderir.<br />

&emsp;&emsp;Kofte kullanıcılarına sunduğu birçok özellikten en çok dikkat çekenlerinden birisi de ülkeler arası 
seyehat eden yolcuların seyehat ettiği yerlerden sipariş alıp seyehat edecekleri yerde başka kullanıcıya
satmasıdır.
                </p>
              </Col>
              <Col md="6">
                <Row className="justify-content-between align-items-center">
                  <UncontrolledCarousel items={carouselItems} />
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  );
}

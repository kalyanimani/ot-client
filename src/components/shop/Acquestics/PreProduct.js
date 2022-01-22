import React, { Component } from 'react'
import Header from '../../layouts/Header';
import CaseStudy from '../../layouts/CaseStudy';
import Footer from '../../layouts/Footer';
export default class PreProduct extends Component {
    render() {
        return (
            <div>
        <header id="header" className="fixed-top1">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-xl-12 d-flex align-items-center justify-content-between">
                <h1 className="logo"><a href="index.html"><img src="assets/img/logo.png" /></a></h1>
                <nav className="nav-menu d-none d-lg-block">
                  <ul>
                    <li className="mega-menu active"><a href="#">SOLUTIONS</a>
                      <div className="sub-menu-block">
                        <div className="row">
                          <div className="col-md-2 col-lg-2 col-sm-2">
                            <ul className="sub-menu-lists">
                              <li><a href="#">PRO AUDIO</a></li>
                              <li><a href="#">RESIDENTIAL</a></li>
                              <li><a href="#">COMMERCIAL</a></li>
                              <li><a href="#">INSTITUTIONAL</a></li>
                            </ul>
                          </div>
                          <div className="col-md-10 col-lg-10 col-sm-10">
                            <ul className="sub-menu-img">
                              <li><a href="#"><img src="assets/img/mega-1.jpg" /> APARTMENT</a></li>
                              <li><a href="#"><img src="assets/img/mega-1.jpg" /> APARTMENT</a></li>
                              <li><a href="#"><img src="assets/img/mega-1.jpg" /> APARTMENT</a></li>
                              <li><a href="#"><img src="assets/img/mega-1.jpg" /> APARTMENT</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li><a href="#about">MARKETPLACE</a></li>
                    <li><a href="#services">ACOUSTIC ART PANELS</a></li>
                    <li><a href="#portfolio">SUPPORT</a></li>
                  </ul>
                </nav>
                {/* .nav-menu */}
                <div className="btn-s"> <a href="#about" className="get-started-btn scrollto">SIGN IN</a> <a href="#about" className="cart scrollto"><i className="fas fa-shopping-cart" /></a> </div>
              </div>
            </div>
          </div>
        </header>
        {/* End Header */}
        <section className="acoustic_card">
          <div>
            <div className="row">
              <div className="col-sm-3 ma-0">
                <div className="horizontal-card">
                  <div className="zoom-card is-lg lazy" data-original="assets/img/insta-5.jpg" style={{backgroundImage: 'url("assets/img/insta-5.jpg")'}}>
                    <a className="card__link-wrapper" href="#"><div className="content__inner">Max van den <br /> Qutelean
                        <i className="fa fa-arrow-right" aria-hidden="true" />
                      </div>
                    </a>
                  </div>
                  <div className="gradient" />
                </div>
              </div>
              <div className="col-sm-3 ma-0">
                <div className="horizontal-card">
                  <div className="zoom-card is-lg lazy" data-original="assets/img/insta-5.jpg" style={{backgroundImage: 'url("assets/img/insta-5.jpg")'}}>
                    <a className="card__link-wrapper" href="#"><div className="content__inner">Alen Azabache
                        <i className="fa fa-arrow-right" aria-hidden="true" />
                      </div>
                    </a>
                  </div>
                  <div className="gradient" />
                </div>
              </div>
              <div className="col-sm-3 ma-0">
                <div className="horizontal-card">
                  <div className="zoom-card is-lg lazy" data-original="assets/img/insta-5.jpg" style={{backgroundImage: 'url("assets/img/insta-5.jpg")'}}>
                    <a className="card__link-wrapper" href="#"><div className="content__inner">Mothivational<br />  Art
                        <i className="fa fa-arrow-right" aria-hidden="true" />
                      </div>
                    </a>
                  </div>
                  <div className="gradient" />
                </div>
              </div>
              <div className="col-sm-3 ma-0">
                <div className="horizontal-card">
                  <div className="zoom-card is-lg lazy" data-original="assets/img/insta-5.jpg" style={{backgroundImage: 'url("assets/img/insta-5.jpg")'}}>
                    <a className="card__link-wrapper" href="#"><div className="content__inner">To <br /> Seller
                        <i className="fa fa-arrow-right" aria-hidden="true" />
                      </div>
                    </a>
                  </div>
                  <div className="gradient" />
                </div>
              </div>
              <div />
            </div>
          </div>
        </section>
        <div className="market-list">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 ">
                <div className="spinner scroll-down al-c"> <a className="animate" /> </div>
              </div>
              <div className="col-md-3 sidebar">
                <input className="searchbox" type="text" defaultValue name="s" placeholder="Search for" id="s" />
                <div className="menu">
                  <h3>VIEW BY category</h3>
                  <div id="accordion" className="accordion">
                    <div className="card mb-0">
                      <div className="card-header collapsed" data-toggle="collapse" href="#collapseOne">
                        <a className="card-title">FEATURED</a>
                      </div>
                      <div id="collapseOne" className="card-body collapse" data-parent="#accordion">
                        <ul>
                          <li><a href="#">WALL TREATMENT</a></li>
                          <li><a href="#">SOUNDPROOFING</a></li>
                          <li><a href="#">CEILING TREATMENT</a></li>
                          <li><a href="#">DO-IT-YOURSELF</a></li>
                          <li><a href="#">ACOUSTIC ART</a></li>
                          <li><a href="#">QUICK SHIP</a></li>
                        </ul>
                      </div>
                      <div className="card-header collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                        <a className="card-title">WALL TREATMENT</a>
                      </div>
                      <div id="collapseTwo" className="card-body collapse" data-parent="#accordion">
                        <ul>
                          <li><a href="#">WALL TREATMENT</a></li>
                          <li><a href="#">SOUNDPROOFING</a></li>
                          <li><a href="#">CEILING TREATMENT</a></li>
                          <li><a href="#">DO-IT-YOURSELF</a></li>
                          <li><a href="#">ACOUSTIC ART</a></li>
                          <li><a href="#">QUICK SHIP</a></li>
                        </ul>
                      </div>
                      <div className="card-header collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                        <a className="card-title">SOUNDPROOFING</a>
                      </div>
                      <div id="collapseThree" className="card-body collapse" data-parent="#accordion">
                        <ul>
                          <li><a href="#">WALL TREATMENT</a></li>
                          <li><a href="#">SOUNDPROOFING</a></li>
                          <li><a href="#">CEILING TREATMENT</a></li>
                          <li><a href="#">DO-IT-YOURSELF</a></li>
                          <li><a href="#">ACOUSTIC ART</a></li>
                          <li><a href="#">QUICK SHIP</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="menu">
                  <h3>VIEW BY Solution</h3>
                  <div id="accordion" className="accordion">
                    <div className="card mb-0">
                      <div className="card-header collapsed" data-toggle="collapse" href="#collapseOne">
                        <a className="card-title">FEATURED</a>
                      </div>
                      <div id="collapseOne" className="card-body collapse" data-parent="#accordion">
                        <ul>
                          <li><a href="#">WALL TREATMENT</a></li>
                          <li><a href="#">SOUNDPROOFING</a></li>
                          <li><a href="#">CEILING TREATMENT</a></li>
                          <li><a href="#">DO-IT-YOURSELF</a></li>
                          <li><a href="#">ACOUSTIC ART</a></li>
                          <li><a href="#">QUICK SHIP</a></li>
                        </ul>
                      </div>
                      <div className="card-header collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                        <a className="card-title">WALL TREATMENT</a>
                      </div>
                      <div id="collapseTwo" className="card-body collapse" data-parent="#accordion">
                        <ul>
                          <li><a href="#">WALL TREATMENT</a></li>
                          <li><a href="#">SOUNDPROOFING</a></li>
                          <li><a href="#">CEILING TREATMENT</a></li>
                          <li><a href="#">DO-IT-YOURSELF</a></li>
                          <li><a href="#">ACOUSTIC ART</a></li>
                          <li><a href="#">QUICK SHIP</a></li>
                        </ul>
                      </div>
                      <div className="card-header collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                        <a className="card-title">SOUNDPROOFING</a>
                      </div>
                      <div id="collapseThree" className="card-body collapse" data-parent="#accordion">
                        <ul>
                          <li><a href="#">WALL TREATMENT</a></li>
                          <li><a href="#">SOUNDPROOFING</a></li>
                          <li><a href="#">CEILING TREATMENT</a></li>
                          <li><a href="#">DO-IT-YOURSELF</a></li>
                          <li><a href="#">ACOUSTIC ART</a></li>
                          <li><a href="#">QUICK SHIP</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="sug_pro">
                  <div className="container">
                    <div className="row">
                      <div className="li-product col-md-4 mr-l-0"> <img src="assets/img/market-product1.jpg" />
                        <p>Lorem ipsum dolor</p>
                      </div>
                      <div className="li-product col-md-4 mr-l-0"> <img src="assets/img/market-product1.jpg" />
                        <p>Lorem ipsum dolor</p>
                      </div>
                      <div className="li-product col-md-4 mr-l-0"> <img src="assets/img/market-product1.jpg" />
                        <p>Lorem ipsum dolor</p>
                      </div>
                      <div className="li-product-spl col-md-8">
                        <div>
                          <h2>Podcast <br />
                            DIY KIT</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          <div className="price"> <span>39.99 USD</span> <span>Shop now</span> </div>
                        </div>
                        <img src="assets/img/market-product2.jpg" /> </div>
                      <div className="li-product col-md-4 mr-l-0"> <img src="assets/img/market-product1.jpg" />
                        <p>Lorem ipsum dolor</p>
                      </div>
                      <div className="li-product col-md-4 mr-l-0"> <img src="assets/img/market-product1.jpg" />
                        <p>Lorem ipsum dolor</p>
                      </div>
                      <div className="li-product col-md-4 mr-l-0"> <img src="assets/img/market-product1.jpg" />
                        <p>Lorem ipsum dolor</p>
                      </div>
                      <div className="li-product col-md-4 mr-l-0"> <img src="assets/img/market-product1.jpg" />
                        <p>Lorem ipsum dolor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="spec">
          <div className="container">
            <div className="row">
              <h2>SUGGESTED PRODUCTS</h2>
              <div className="li-product col-md-3 mr-l-0">
                <img src="assets/img/market-product1.jpg" />
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="li-product col-md-3 mr-l-0">
                <img src="assets/img/market-product1.jpg" />
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="li-product col-md-3 mr-l-0">
                <img src="assets/img/market-product1.jpg" />
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="li-product col-md-3 mr-l-0">
                <img src="assets/img/market-product1.jpg" />
                <p>Lorem ipsum dolor</p>
              </div>
            </div>
          </div>
        </section>
        {/* ======= Footer ======= */}
        <footer id="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="CTA">
                  <h2>Ready to <br />
                    sound better?</h2>
                  <a href="#">START HERE <i className="fas fa-chevron-right" /></a> </div>
              </div>
              <div className="col-lg-6">
                <div className="q_links">
                  <div className="row">
                    <div className="col-lg-4">
                      <h4>Shop</h4>
                      <ul>
                        <li><a href="#">Wall Treatment </a></li>
                        <li><a href="#">Ceiling Treatment </a></li>
                        <li><a href="#">Sound Proofing </a></li>
                        <li><a href="#">Acoustic Art</a></li>
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <h4>Solutions</h4>
                      <ul>
                        <li><a href="#">Pro Audio </a></li>
                        <li><a href="#">Residential </a></li>
                        <li><a href="#">Commercial </a></li>
                        <li><a href="#">Institutional</a></li>
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <h4>About</h4>
                      <ul>
                        <li><a href="#">Why Overtone? </a></li>
                        <li><a href="#">Acoustics 101 </a></li>
                        <li><a href="#">Support </a></li>
                        <li><a href="#">FAQ</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="contact">
                  <h4>Contact</h4>
                  <p>Fell free get in touch with us via phone or send us a message</p>
                  <ul>
                    <li><a href="#">+72 699 241-395</a></li>
                    <li><a href="#">brad@overtone.com</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="copyrights">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 copy">
                  <p>© 2020 overtone.coM All rights reserved.</p>
                </div>
                <div className="col-lg-6 social">
                  <ul>
                    <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                    <li><a href="#"><i className="fab fa-twitter" /></a></li>
                    <li><a href="#"><i className="fab fa-instagram" /></a></li>
                    <li><a href="#"><i className="fab fa-google" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
        )
    }
}

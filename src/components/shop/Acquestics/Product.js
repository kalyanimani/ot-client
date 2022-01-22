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
          <main id="page"> 
            {/* ======= Breadcrumbs ======= */}
            <section id="breadcrumbs" className="breadcrumbs">
              <div className="container">
                <ol>
                  <li><a href="index.html">Home</a></li>
                  <li>Wall Treatments</li>
                  <li>Overtone Acoustic Panel</li>
                </ol>
              </div>
            </section>
            {/* End Breadcrumbs */} 
            {/*Product banner*/}
            <div id="product-banner" className="product-banner"> <img src="assets/img/product-banner.jpg" />
              <div className="pro-banner-text">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="price">
                        <h4>Starting at <span>$134</span> <a href="#">4.8 (20 reviews)</a></h4>
                        <h2>OVERTONE ACOUSTIC PANEL</h2>
                        <p>Overtone Acoustic Panels are fabric wrapped sound absorbing wall panels designed to absorb unwanted noise within your space. By minimizing room reflections, you reduce reverberation and create an</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="ac-container al-h">
                        <div>
                          <input id="ac-1" name="accordion-1" type="radio" defaultChecked />
                          <label htmlFor="ac-1">CUSTOMIZE PANEL</label>
                          <article className="page-inner">
                            <div className="row">
                              <div className="col-md-12">
                                <h3>SIZE</h3>
                                <form action="/action_page.php">
                                  <select name="cars" id="cars">
                                    <option value="volvo">36 X 48</option>
                                    <option value="saab">36 X 48</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                  </select>
                                </form>
                              </div>
                              {/* <div class="col-lg-12 acoustic_up_btn">
                        <input #imageInput  type="file" (change)="incomingfile($event)" id="actual-btn" accept="image/*, .png, .jpg, .jpeg, .pdf" onchange="validateFileType()" hidden/>
            <label for="actual-btn">Image Uploader</label>
            <span id="file-chosen">No file chosen</span>
                      </div> */}
                              {/* <div class="col-lg-12">
                        <p>150 dots per inch (DPI) at minimum (300 or 400 dpi preferred) at full size of image. Image resolutions below the minimum may appear blurry and show undesirable pixelation.</p>
                      </div> */}
                              <div className="col-lg-12">
                                <h3>FRAME</h3>
                                <form action="/action_page.php">
                                  <select name="cars" id="cars">
                                    <option value="volvo">SELECT FRAME</option>
                                    <option value="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                  </select>
                                </form>
                              </div>
                            </div>
                          </article>
                        </div>
                        <div className="price-bar">
                          <p>$680.00</p>
                          <a href="#">BUY NOW</a> </div>
                        <h3 className="extra f-13">or 4 interest-free payments of $22.50 <img src="assets/img/payment/13.png" /></h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Product banner*/} 
            <section className="print_canvas">
              <div className="container">
                <div className="row">
                  <div className="cart_add_btns">
                    <div className="cart_add_btn btn_1"><a href><i className="fa fa-plus-circle" aria-hidden="true" />
                        <div className="cart_bag_btn"><i className="fa fa-shopping-bag" aria-hidden="true" /></div></a>
                    </div>
                    <div className="cart_add_btn btn_2"><a href /> <i className="fa fa-plus-circle" aria-hidden="true" />
                      <div className="cart_bag_btn"><i className="fa fa-shopping-bag" aria-hidden="true" /></div>
                    </div>
                    <div className="cart_add_btn btn_3"><a href /> <i className="fa fa-plus-circle" aria-hidden="true" />
                      <div className="cart_bag_btn"><i className="fa fa-shopping-bag" aria-hidden="true" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*Product Specs*/}
            <div className="spec">
              <div className="container">
                <h2>SPECS &amp; DOWNLOADS</h2>
                <div className="row details">
                  <div className="col-md-4 specs">
                    <h3>DETAILS</h3>
                    <ul>
                      <li><a href="#">Product Spec Sheet</a></li>
                      <li><a href="#">Installation Guide</a></li>
                    </ul>
                  </div>
                  <div className="col-md-4 maint">
                    <h3>MAINTENANCE</h3>
                    <p>Lorem ipsum dolor sit <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span></p>
                    <ul>
                      <li><a href="#">Lorem ipsum</a></li>
                    </ul>
                  </div>
                  <div className="col-md-4 aous">
                    <h3>ACOUSTICS</h3>
                    <p>Lorem ipsum dolor sit <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span>Lorem ipsum dolor sit</p>
                  </div>
                </div>
              </div>
            </div>
            {/*Product Specs*/} 
          </main>
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

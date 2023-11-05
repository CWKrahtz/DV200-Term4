import React from 'react';
import "./css/footer.css"

function Footer() {
    return(
        <footer class="whirlpool-footer">
            <div class="container">
                <div class="row">
                <div class="col-md-3">
                    <h4>About Us</h4>
                    <p>Ask and answer questions about code</p>
                </div>
                <div class="col-md-3">
                    <h4>Help Center</h4>
                    <ul>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Support</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h4>Community</h4>
                    <ul>
                    <li><a href="#">Forums</a></li>
                    <li><a href="#">Blog</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h4>Contact Us</h4>
                    <p>Email: info@whirlpool.com</p>
                </div>
                </div>
                <div class="row">
                <div class="col-md-12">
                    <hr />
                </div>
                </div>
                <div class="row">
                <div class="col-md-6">
                    <p>Whirlpool</p>
                </div>
                <div class="col-md-6">
                    <ul class="social-icons">
                    <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                    </ul>
                </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
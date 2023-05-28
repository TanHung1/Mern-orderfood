import React from "react";
import './AboutComponent.scss';
import about from '../../assets/about-img.png';
function AboutComponent()  {
        return (
            <section className="about-fastfood">
                <div className="about">
                    <div className="row">
                        <div>
                            <div>
                                <img src={about} style={{ height: '600px' }} />
                            </div>
                        </div>
                        <div className="word-about">
                            <div className="detail-box">
                                <div>
                                    <h2>We Are Feane</h2>
                                </div>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                                    in some form, by injected humour, or randomised words which don't look even slightly believable. If you
                                    are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
                                    the middle of text. All
                                </p>
//egegeigegni
                                <a href="/about"> Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        )
    }

export default AboutComponent;
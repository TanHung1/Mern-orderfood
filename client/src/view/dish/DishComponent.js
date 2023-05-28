
import './DishComponent.scss';
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function DishComponent() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [Data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3030/foods/' + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

        return (
            <section className="dish-wrapper">
                <div className="dish-content">

                    <div className="dish-detail">
                        <h3>THÔNG TIN MÓN ĂN</h3>
                        <form action="">

                            <div className="dish-content">
                                <img className="img-dish" src={Data.Image} />
                                <div className="about-dish">
                                    <div className="info-dish">
                                        <span>Tên món: {Data.nameFood}</span>
                                    </div>
                                    <div className="info-dish">
                                        <span>Đánh giá: 4/5.0</span>
                                    </div>
                                    <div className="info-dish">
                                        <span>Giá bán: {Data.Price}</span>
                                    </div>
                                    <div className="info-dish">
                                        <span>Thông tin món: {Data.Detail}</span>
                                    </div>



                                </div>

                            </div>



                        </form>
                    </div>

                    <div className="nav-commnent">

                        <div className="comment-summary">
                            <div className="header-comment">
                                <h2>BÌNH LUẬN</h2>
                                <div className="comment">
                                    <textarea class="input-comment" placeholder="Hãy viết cảm nghĩ của bạn về món ăn này..." maxlength="500"></textarea>
                                    <button class="btn-comment">Gửi</button>
                                </div>

                            </div>
                            <hr />
                            <div className="user-comment">
                                <div className="user">
                                    <span className="name">Hưng</span>
                                    <span className="star">5/5</span>

                                </div>
                                <div className="p-comment">Ngon</div>
                            </div>
                            <div className="user-comment">
                                <div className="user">
                                    <span className="name">Minh</span>
                                    <span className="star">1/5</span>

                                </div>
                                <div className="p-comment">khong ngon</div>
                            </div>
                        </div>


                    </div>

                </div>
            </section >
        )
    }

export default DishComponent;
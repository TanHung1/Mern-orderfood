import React from "react";
import "../styles/AboutComponent.scss";
import about from "../assets/pizza-about.jpg";
function AboutComponent() {
  return (
    <section className="about-fastfood">
      <div className="about">
        <div className="row">
          <div>
            <div>
              <img src={about} style={{ height: "600px" }} />
            </div>
          </div>
          <div className="word-about">
            <div className="detail-box">
              <div>
                <h2>Yêu thích Pizza</h2>
              </div>
              <p>
                Pizza của chúng tôi được tạo ra bởi một nhóm những người yêu
                thích ẩm thực và mong muốn mang đến những trải nghiệm tuyệt vời
                nhất cho khách hàng. Chúng tôi sử dụng các nguyên liệu tươi nhất
                và tạo ra các loại bột pizza độc đáo để đảm bảo rằng mỗi chiếc
                pizza đều ngon và đầy đủ hương vị. Chúng tôi cũng cung cấp các
                lựa chọn pizza cho những người có chế độ ăn đặc biệt và cam kết
                mang đến cho khách hàng của mình sự hài lòng và dịch vụ tốt
                nhất.
              </p>

              <a href="/about"> Xem thêm</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutComponent;

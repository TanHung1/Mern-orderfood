import "../styles/DetailProductComponent.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from 'moment';
import axios from "axios";
import { Typography, message, Rate, Form, Input, Button } from "antd";

const { TextArea } = Input;

const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);
console.log(dataUser.user.username, 'dataUser');
const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};

export function DetailProduct() {
  const { _id } = useParams();

  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  useEffect (() => {
    axios
      .get(`http://localhost:5000/api/product/${_id}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((err) => console.log(err));
  }, [_id, rating]);

  // console.log(product.review, 'review')

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cartItems.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      message.warning("Đã có sản phẩm này trong giỏ hàng");
    } else {
      message.success("Thêm sản phẩm thành công")
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  const handleRating = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/product/detail-product/${_id}`, {
      user_id: dataUser.user._id,
      name: dataUser.user.username,
      rating,
      comment,
    });
    setRating(response)
    message.success("Đánh giá thành công")
    } catch (error) {
        message.error("Đánh giá thất bại")
    }
    
  }
  
  return (
    <>
      <div>Chi tiết sản phẩm</div>
      <div className="detail-product">
        <div className="block-left">
          <img src={product?.image}></img>
        </div>

        <div className="block-right">
          <p className="nameprod">{product?.nameprod}</p>
          <p className="price">{product?.price}</p>
          <button class="btn-add-to-cart" onClick={() => handleAddToCart(product)}>Thêm vào giỏ hàng</button>
        </div>
      </div>

      <div className="product-rating">
        <h2>Đánh giá sản phẩm</h2>

        <div className="rating-list">
          {product?.reviews?.map((review) => review.rating && review.comment && (
            <div key={review._id} className="rating-item">
              <p className="username">{review.name}</p>
              <Rate value={review.rating} disabled />
              <p style={{fontSize: 12}}>{moment(review.created).format('DD-MM-YYYY HH:mm')}</p>
              <p>{review.comment}</p>
              <hr/>
            </div>
          ))}
        </div>

      </div>

      <div className="my-rating">
        <Form >
          <Form.Item name="rating" label="Đánh giá của bạn">
            <Rate value={rating} defaultValue={1} onChange={(ratingValue) => setRating(ratingValue)} />
          </Form.Item>

          <Form.Item name="comment" label="Bình luận của bạn">
            <Input.TextArea
              value={comment}
              onChange={(e) => setComment(e.target?.value ?? '')}
              rows={4}
              maxLength={100}
              placeholder="Nhập bình luận"
            />
          </Form.Item>

          <Form.Item>
            <Button onClick={handleRating} type="primary" htmlType="submit">
              Đánh giá
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
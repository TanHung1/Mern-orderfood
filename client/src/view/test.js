import { useState, useEffect } from "react";
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
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product/${_id}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((err) => console.log(err));
  }, [_id, rating, comment, isSubmit]); // Thêm biến state isSubmit vào useEffect

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

  const onChange = (e) => {};

  const handleRating = async () => {
    try {
      await axios.post(`http://localhost:5000/api/product/detail-product/${_id}`, {
        user_id: dataUser.user._id,
        name: dataUser.user.username,
        rating,
        comment,
      });
      message.success("Đánh giá thành công")

      // Sau khi thêm đánh giá mới thành công, cập nhật lại danh sách đánh giá và bình luận
      const newProduct = { ...product };
      newProduct.reviews.push({
        user_id: dataUser.user._id,
        name: dataUser.user.username,
        rating: rating,
        comment: comment,
        created: new Date().toISOString()
      });
      setProduct(newProduct);

      // Xóa nội dung đánh giá trên form và set biến isSubmit để cập nhật lại useEffect
      setRating(1);
      setComment('');
      setIsSubmit(!isSubmit);
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
              <p style={{fontSize: 12}}>{moment(review.created).format('DD-MM-YYYY HH:mm:ss')}</p>
              <p>{review.comment}</p>
              <hr/>
            </div>
          ))}
        </div>
      </div>

      <div className="my-rating">
        <Form >
          <Form.Item name="rating" label="Đánh giá của bạn">
            <Rate defaultValue={1} onChange={(ratingValue) => setRating(ratingValue)}

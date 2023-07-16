import "../styles/DetailProductComponent.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import {
  Typography,
  message,
  Rate,
  Form,
  Input,
  Button,
  Modal,
  Image,
} from "antd";
import user from "../assets/user.png";
import Avatar from "antd/es/avatar/avatar";

const { TextArea } = Input;

const accessToken = localStorage.getItem("token");
const dataUser = JSON.parse(accessToken);

const token = {
  headers: {
    Authorization: `Bearer ${dataUser?.token}`,
    "Content-Type": "application/json",
  },
};

export function DetailProduct() {
  const [open, setOpen] = useState(false);
  const { _id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState();

  const productAll = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/product/${_id}`
    );

    if (response?.data) {
      const productData = response.data.product;
      const sortedReviews = productData.reviews.sort((a, b) => {
        return moment(b.created).diff(moment(a.created));
      });
      setProduct({ ...productData, reviews: sortedReviews });
    }

    console.log(response);

    return response?.data;
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    navigate("/login");
  };
  useEffect(() => {
    productAll();
  }, []);

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cartItems.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      message.warning("Đã có sản phẩm này trong giỏ hàng");
    } else {
      message.success("Thêm sản phẩm thành công");
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const handleRating = async (event) => {
    event.preventDefault();
    try {
      if (!accessToken) {
        showModal();
        handleOk();
        handleCancel();
      }
      const response = await axios.post(
        `http://localhost:5000/api/product/create-review/${_id}`,
        {
          user_id: dataUser.user._id,
          avatar: dataUser.user.avatar,
          name: dataUser.user.username,
          rating: rating,
          comment: comment,
        },
        token
      );
      if (response?.data) {
        message.success("Đánh giá thành công");
        await productAll();
      }
      return response?.data;
    } catch (error) {
      message.error("Đánh giá thất bại");
    }
  };

  return (
    <>
      <div>Chi tiết sản phẩm</div>
      <div className="detail-product">
        <div className="block-left">
          <Image src={product?.image} />
        </div>

        <div className="block-right">
          <p className="nameprod">{product?.nameprod}</p>
          <p className="category">{product?.category}</p>
          <p className="price">
            {product?.price ? product?.price.toLocaleString() : ""}&#8363;
          </p>
          <button
            class="btn-add-to-cart"
            onClick={() => handleAddToCart(product)}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <Modal
        title="Bạn cần đăng nhập để đánh giá"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <div className="my-rating">
        <form onSubmit={handleRating}>
          <Form.Item name="rating" label="Đánh giá của bạn">
            <Rate
              defaultValue={rating}
              onChange={(ratingValue) => {
                setRating(ratingValue);
              }}
            />
          </Form.Item>

          <Form.Item name="comment" label="Bình luận của bạn">
            <Input.TextArea
              value={comment}
              onChange={(e) => {
                setComment(e?.target?.value);
              }}
              rows={4}
              maxLength={100}
              placeholder="Nhập bình luận"
            />
          </Form.Item>
          <Form.Item>
            <button type="submit">Đánh giá</button>
          </Form.Item>
        </form>
      </div>

      <div className="product-rating">
        <h2 style={{ color: "black" }}>Đánh giá sản phẩm</h2>

        <div className="rating-list">
          {product?.reviews?.map((review) => (
            <div key={review._id} className="rating-item">
              {review.avatar ? (
                <Avatar src={review.avatar} />
              ) : (
                <Avatar
                  src={user}
                  style={{
                    border: "1px solid",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 0, 0, 0.25)",
                  }}
                ></Avatar>
              )}
              <p className="username">{review.name}</p>
              <Rate value={review.rating} disabled />
              <p style={{ fontSize: 12 }}>
                {moment(review.created).format("DD-MM-YYYY HH:mm")}
              </p>
              <p>{review?.comment}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

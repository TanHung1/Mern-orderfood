import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ManageFood.scss";
import { message, Button, Popconfirm, Table } from "antd";
import { DeleteOutlined, RetweetOutlined } from "@ant-design/icons";
const accessToken = localStorage.getItem("token");

const dataUser = JSON.parse(accessToken);
console.log(dataUser?.token
    , 'token')
const token = {
    headers: {
        Authorization: `Bearer ${dataUser?.token}`,
        "Content-Type": "application/json",
    },
};

function TrashFood() {
    const [data, setData] = useState([]);
    const [deletedProduct, setDeletedProduct] = useState(null);
    const [open, setOpen] = useState(false);

    const getTrash = async () => {
        await axios
            .get("http://localhost:5000/api/admin/trash-product", token)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        getTrash()
    }, [deletedProduct]);

    const handleCancel = () => {
        setOpen(false);
    };

    const handleRestore = async (_id, data) => {
        const result = await axios.patch(`http://localhost:5000/api/admin/restore-product/${_id}`, data, token)
        console.log(result)
        if (result?.data?.success) {
            message.success("Khôi phục thành công")
            getTrash()
        } else {
            message.error('Khôi phục thất bại')
        }
        return result?.data

    }

    const handleForceDelete = async (_id) => {
        setOpen(true)
        try {
            await axios
                .delete(`http://localhost:5000/api/admin/forcedelete-product/${_id}`, token)
                message.success("Xóa thành công")
                    
            setDeletedProduct(_id);
        } catch (error) {
            message.error("Xóa thật bại")
        }

    }

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            width: "10%",
            align: "center",
            render: (_id) => <span>{_id}</span>,

        },
        {
            title: 'Tên món',
            dataIndex: 'nameprod',
            key: 'nameprod',
            width: "40%",
            align: "center",
            render: (nameprod) => <span>{nameprod}</span>
        },
        {
            title: 'Hình',
            dataIndex: 'image',
            key: 'image',
            width: "20%",
            align: "center",
            render: (image) => <img style={{ maxWidth: 100 }} src={image}></img>
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            align: "center",
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
            render: (price) => <span>{price}</span>
        },
        {
            title: 'Loại',
            dataIndex: 'category',
            key: 'category',
            align: "center",
            filters: [
                {
                    text: 'pizza',
                    value: 'pizza',
                },
                {
                    text: 'drink',
                    value: 'drink',
                },
                {
                    text: 'desserts',
                    value: 'desserts',
                },
                {
                    text: 'side',
                    value: 'side',
                }
            ],
            onFilter: (value, record) => record.category.indexOf(value) === 0,
            render: (category) => <span>{category}</span>
        },
        {
            title: 'Lựa chọn',
            key: 'action',
            align: "center",
            render: (record) => (
                <span>                    
                    <Button onClick={() => handleRestore(record._id, data)} type="primary"><RetweetOutlined /></Button>

                    <Popconfirm
                        placement="top"
                        title="Lưu ý"
                        description="Bạn vẫn muốn xóa, hành động này không thể khôi phục được?"
                        onConfirm={() => handleForceDelete(record._id)}
                        visible={open}
                        onCancel={handleCancel}
                    >
                        <Button style={{ marginLeft: 10 }} type="primary" danger>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>

                </span>
            )
        }
    ]

    return (
        <section className="">
            <div className="account-food-content">
                <div className="right-history">
                    <div className="admin-right">
                        <h3 style={{ textAlign: "center" }} className="list-food">DANH SÁCH MÓN ĂN BỊ XÓA</h3>
                        <Link to={"/admin/manage-food"}>Trở về</Link>
                        <Table
                            columns={columns}
                            dataSource={data.products}
                            bordered
                        >
                        </Table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TrashFood;

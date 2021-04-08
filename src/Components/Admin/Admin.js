import axios from "axios";
import "./Admin.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faEdit,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import swal from "sweetalert";

const Admin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageURL, setImageURL] = useState(null);
  const history = useHistory();

  const [products, setPorducts] = useState([]);
  useEffect(() => {
    fetch("https://whispering-stream-19575.herokuapp.com/allProducts")
      .then((res) => res.json())
      .then((data) => {
        setPorducts(data);
      });
  }, []);

  const onSubmit = (data) => {
    const productData = {
      name: data.name,
      price: data.price,
      weight: data.weight,
      quantity: data.quantity,
      imageURL: imageURL,
    };
    console.log(productData);
    fetch("https://whispering-stream-19575.herokuapp.com/addProducts", {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
    .then(res => console.log('server connected'))
  };

  const imageUpload = (e) => {
    const formData = new FormData();
    formData.set("key", "c523fa17adba6191129adce4be22aeda");
    formData.append("image", e.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", formData)
      .then((res) => {
        console.log(res.data.data.display_url);
        setImageURL(res.data.data.display_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItem = (id) => {
    console.log(id);
    fetch("https://whispering-stream-19575.herokuapp.com/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    swal("Alert!", "You deleted the product!", "warning");
    history.push("/admin");
  };

  const handleAdd = () => {
    document.getElementById("deleteTable").style.display = "none";
    document.getElementById("addForm").style.display = "block";
  };

  const handleDelete = () => {
    document.getElementById("addForm").style.display = "none";
    document.getElementById("deleteTable").style.display = "block";
  };

  return (
    <div className="admin-body">
      <div className="admin">
        <div className="sidebar">
          <h3 className="text-center mt-5 mb-3 text-bold text-white">
            <FontAwesomeIcon icon={faTasks} /> Manage Product
          </h3>
          <button onClick={handleDelete} className="btn btn-warning mx-5 ">
            <FontAwesomeIcon icon={faTrash} /> Delete Product
          </button>
          <br />
          <br />
          <button onClick={handleAdd} className="manage btn btn-warning mx-5">
            <FontAwesomeIcon icon={faPlus} /> Add Product
          </button>
        </div>
        <div className="content">
          {products.length > 0 ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border d-none" role="status"></div>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <div className="spinner-border " role="status"></div>
            </div>
          )}
          <div id="deleteTable">
            <h3 className="mt-3 text-warning">Manage Product</h3>
            <Table bordered>
              <thead>
                <tr class="text-danger">
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              {products.map((product) => (
                <tbody>
                  <tr class="text-danger">
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>$ {product.price}.00</td>
                    <td>
                      <button className="btn bg-warning">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      {"  "}
                      <button
                        onClick={() => deleteItem(product)}
                        className="btn bg-danger"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </div>
          <div id="addForm" className="text-styling">
            <form  onSubmit={handleSubmit(onSubmit)}>
              <h6>Name</h6>
              <input {...register("name")} /> <br />
              <h6>Price</h6>
              <input {...register("price")} /> <br />
              <h6>Weight</h6>
              <input {...register("weight")} /> <br />
              <h6>Quantity</h6>
              <input {...register("quantity")} /> <br />
              <h6>Upload Image</h6>
              <input type="file" onChange={imageUpload} /> <br />
              <button className="btn btn-warning mt-2" type="submit">
                Store in Database
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

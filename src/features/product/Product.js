import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts, addProduct } from "./product.slice";

import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
export function Products() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.product);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const onChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleProduct = (e) => {
    const { name, description } = product;
    dispatch(addProduct({ name, description }));
    e.preventDefault();
    handleClose();
    window.location.reload(true);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row className="m-5">
        <Col>
          <div className="d-flex p-2 justify-content-start">
            <h1>Products List</h1>
          </div>
          <div className="d-flex p-2 justify-content-end">
            <Button variant="primary" onClick={handleShow}>
              Add New Product
            </Button>
          </div>
          <Modal show={showModal} onHide={handleClose}>
            <form onSubmit={handleProduct}>
              <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={onChangeInput}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={product.description}
                    name="description"
                    onChange={onChangeInput}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </form>
          </Modal>

          {isLoading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>Error</h2>
          ) : (
            <Table
              striped
              bordered
              hover
              variant="striped"
              size="sm"
              responsive
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                {data.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

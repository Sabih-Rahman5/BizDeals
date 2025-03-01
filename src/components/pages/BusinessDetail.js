import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

import Carousel from 'react-bootstrap/Carousel';

import pic from '../images/delightwear.jpeg';
import pic2 from '../images/coverpic5.png';

import Figure from 'react-bootstrap/Figure';

import { useParams, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import client from "../config/AxiosConfig";
import axios from 'axios';


const BusinessDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const baseURL = `http://localhost:8000/api/listings/${id}`;

    const [data, setData] = useState([]);

    useEffect(() => {

        axios.get(baseURL).then(
            (res) => {
                setData(res.data);
                document.title = res.data.title + " - Bizdeals";
            }
        )


    }, [])

    const checkout = (id) => {

        navigate(`/checkout/${id}`);

    }

    if (!data) {
        return <h1>None</h1>
    }

    return (

        <Container fluid>

            <Row className='mb-5 mt-3'>
                <Col sm={12} md={6} key={data.id} >
                    <Row>
                        <Figure>
                            <Figure.Image
                                width={700}
                                height={700}
                                alt="171x180"
                                src={data.img1}
                            />
                            <Figure.Caption>
                                {data.title}
                            </Figure.Caption>
                        </Figure>
                    </Row>

                    <Row>
                        <Col>
                            <Figure>
                                <Figure.Image
                                    width={300}
                                    height={300}
                                    alt="171x180"
                                    src={data.img2}
                                />
                                <Figure.Caption>
                                    Seller: {data.seller}
                                </Figure.Caption>
                            </Figure>
                        </Col>


                    </Row>

                </Col>

                <Col sm={12} md={6}>
                    <Row>
                        <h1 className='mt-2'>{data.title}</h1>
                        <h5>Price: Rs {data.price}</h5>
                        {data.username !== localStorage.getItem('user_name') && <Button onClick={() => { checkout(data.id) }} className='btn btn-md-primary'> Purchase </Button>}
                        {data.username === localStorage.getItem('user_name') && <span><u>You Own this Business!</u></span>}
                    </Row>

                    <Row>
                        <Card className='mt-3'>




                            <h3 className='mt-2'>Description</h3>

                            <Card.Body>
                                <Card.Title>About us!</Card.Title>
                                <Card.Text>
                                    {data.description}
                                </Card.Text>
                                <Card.Title>Location </Card.Title>
                                <Card.Text>
                                    {data.location}
                                </Card.Text>
                                <Card.Title>Business Info</Card.Title>
                                <Card.Text>
                                    <ul>
                                        <li>Revenue in PKR per month: RS {data.revenue}</li>
                                        <li>Expense in PKR per month: RS {data.expense}</li>
                                        <li>Profit in PKR per month: RS {data.profit}</li>
                                    </ul>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Row>

                </Col>

            </Row>
        </Container>
    );
}

export default BusinessDetail;
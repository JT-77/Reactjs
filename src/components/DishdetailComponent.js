import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Label, Col, Row } from 'reactstrap';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment);
    }

    render() {

        return(
            <div>
                <Button outline onClick={this.toggleModal }>
                    <span className="fa fa-pencil"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={ (values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Col>
                            <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control"  >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Label htmlFor="yourname">Your Name</Label>
                                <Control.text model=".yourname" id="yourname" name="yourname" placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}  />
                                <Errors className="text-danger"
                                    model=".yourname" show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} />
                        </Col>
                        </Row>
                        <Row className="form-group">
                        <Col>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                                    className="form-control" />
                        </Col>
                        </Row>
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}



    function RenderComments({comments, postComment, dishId}) {

        if(comments != null) {

            let options = {year: 'numeric', month: 'short', day:'2-digit'};
            const list  = comments.map((c) => {
               return( 
                <div key={c.id}>
                <ul class="list-unstyled">
                <Stagger in> 
                    <Fade in>
                        <li>{c.comment}</li>
                        <br/>
                        <li>-- {c.author}, {new Date(c.date).toLocaleDateString("en-US", options)}</li>
                    </Fade>
               </Stagger>
               </ul>
                </div>
            );
        });

            return(
                <div>
                    <h4>Comments</h4>
                    {list}
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            )
        }
        else {
            return(
                <div></div>
            );
        }
    }

    function RenderDish({dish}) {
        if(dish != null) {
            return(
                <FadeTransform 
                    in 
                    tranformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        }
        else {
            return (<div></div>);
        }
    }

    const Dishdetail = (props) => {
        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errmess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errmess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null) 
            return(
                <div className="container">
                    <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr /> 
                    </div>
                </div>
                <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div class="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                </div>
                </div>
                </div>
            );
        else {
            return (<div></div>);
        }
    }

export default Dishdetail;
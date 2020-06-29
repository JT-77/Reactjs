import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderComments({comments}) {

        if(comments != null) {

            let options = {year: 'numeric', month: 'short', day:'2-digit'};
            const list  = comments.map((c) => {
               return( 
                <div key={c.id}>
                <ul class="list-unstyled">
                <li>{c.comment}</li>
                <br/>
               <li>-- {c.author}, {new Date(c.date).toLocaleDateString("en-US", options)}</li>
                </ul>
                </div>
            );
        });

            return(
                <div>
                    <h4>Comments</h4>
                    {list}
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
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return (<div></div>);
        }
    }

    const Dishdetail = (props) => {
        if(props.dish != null) 
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
                    <RenderComments comments={props.comments} />
                </div>
                </div>
                </div>
            );
        else {
            return (<div></div>);
        }
    }

export default Dishdetail;
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    renderComments(comments) {

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

    renderDish(dish) {
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

    render() {
        if(this.props.dish != null) 
            return(
                <div className="container">
                <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div class="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish.comments)}
                </div>
                </div>
                </div>
            );
        else {
            return (<div></div>);
        }
    }
}

export default Dishdetail;
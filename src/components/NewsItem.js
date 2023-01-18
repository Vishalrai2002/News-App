import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl,newsUrl} = this.props;
        return (
            <div className="my-3">
                <div className="card" style={{width: "18rem"}}>
                    <img src={!imageUrl?"https://image.cnbcfm.com/api/v1/image/107179843-1673998440397-gettyimages-1243657231-JAPAN_TANKAN.jpeg?v=1673999044&w=1920&h=1080":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
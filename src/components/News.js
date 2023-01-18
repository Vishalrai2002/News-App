import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
constructor(){
    super();
    console.log("I am a constructor from News components");
    this.state={
      articles:[],
      loading:false
    }
}

//  Fetch news using api
async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=b3ffabd098f0420480f110883232f7f0";
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles})

  }

  render() {

    return (
      <div className="container my-3">
       <h2>New Total - Top Headlines</h2>
       <div className="row">
       {this.state.articles.map((element)=>{
        return <div className="col-md-4"  key={element.url} >
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
       })}
  
      </div>
      </div>
    )
  }
}

export default News

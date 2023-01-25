import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalresults] = useState(0)

   
    const capitalizeFirstLetter =(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    

   const updateNews= async()=>{
        props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(parsedData.articles);
            setTotalresults(parsedData.totalResults);
            setLoading(false);

            
        props.setProgress(100);

    }
    
    useEffect(() => {
        document.title=capitalizeFirstLetter(props.category)+" - NewsTotal";
        updateNews();
        // eslint-disable-next-line 
    }, [])

    // const handlePrevClick = async ()=>{
    //    setPage(page-1);
    //     updateNews();

    // }
    
    // const handleNextClick = async ()=>{
    //         setPage(page+1);
    //     updateNews();
    // }
    
  const fetchMoreData = async() => {
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1);
            let data = await fetch(url);
            let parsedData = await data.json()
            setArticles(articles.concat(parsedData.articles))
            setTotalresults(parsedData.totalResults)
      };

        return (
            <>
                <h2 className="text-center" style={{margin:'35px 0px', marginTop:'80px'}}>NewsTotal - Top {capitalizeFirstLetter(props.category)} Headlines</h2> 
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={(articles.length)!==totalResults}
                    loader={<Spinner/>}> 
                    <div className="container">
                <div className="row"> 
                {articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
                    </div> 
                })} 
                </div>
                </div> 
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)}type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    
}

News.defaultProps = {
    country: 'in',
    pageSize: 8, 
    category: 'general',
  }

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
  }


export default News
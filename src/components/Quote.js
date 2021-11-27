import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Quote = () => {
    const [quoteText, setquoteText] = useState(null);

    const getAdvice = async () =>{
        let url = 'https://api.adviceslip.com/advice';
        await fetch(url).then((response) =>{
            if (response.ok) {
                console.log("got the response");
                return response.json();
            }
            else{
                throw new Error("Something went wrong :(");
            }
        })
        .then((jsonResponse) =>{
            setquoteText(jsonResponse.slip.advice);
        })
        .catch((err) =>{
            console.log(err);
        });
    }

    //this is a defensive code and we remember that fetch uses two thens! Otherwise you could always do as this below
    // const getAdvice = async () =>{
    //     let url = 'https://api.adviceslip.com/advice';
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     setquoteText(parsedData.slip.advice);
    // }
    

    useEffect(() => {
        getAdvice();        
    }, [])

    return (
        <div className = "container">
            <p className = "text">{quoteText}</p>
            <button className = "btn" onClick = {getAdvice}>Give me an advice for life</button>
        </div>
    )
}

export default Quote

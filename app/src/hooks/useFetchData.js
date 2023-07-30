import {useState , useEffect } from 'react'

const useFetchData = (url) => {

    const [data , setData] = useState(null);
    const [error , setError] = useState(false);
    const [loading , setLoading] = useState(false);
    console.log("Hello");

    const getData = async (url) => {
        console.log("Andisnain")
        try {
            setLoading(true)
            const response = await fetch(url);
            const data = await response.json();
            console.log("adsa : " , data);
            setData(data);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        getData(url);
    } , [url]);

    return {data , error , loading};
}

export default useFetchData
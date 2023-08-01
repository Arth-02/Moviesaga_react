import {useState , useEffect } from 'react'

const useFetchData = (url) => {

    const [data , setData] = useState(null);
    const [error , setError] = useState(false);
    const [loading , setLoading] = useState(false);

    const getData = async (url) => {
        try {
            setLoading(true)
            const response = await fetch(url);
            const data = await response.json();
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
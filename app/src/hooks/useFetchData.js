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

            let newData = data?.results?.filter((movie) => {
                return movie?.poster_path !== null && movie?.profile_path !== null && movie?.backdrop_path !== null;
            })
            setData(newData ? newData : data);
            // setTimeout(() => {
            //     setLoading(false);
            // } , 500)
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
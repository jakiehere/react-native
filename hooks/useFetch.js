import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': 'dfc4ce9dc2msh9e10bf2057eaf2ap1b98e7jsn6ae75182ac9d',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        params: { ...query},
      };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.request(options)
            setData(res.data.data)
            setIsLoading(false)
        } catch (error) {
            setError(error);
            alert("There is an error")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }
    return { data, isLoading, error, refetch }
}

export default useFetch;
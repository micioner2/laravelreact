import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url, inititalState) {
    const [data, setData] = useState(inititalState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    function getData() {
        setLoading(true)

        axios.get(url).then(res => {
            setData(res.data)
            setLoading(false)
        })
            .catch(err => {
                setError(err)
                setLoading(false)
            })

    }

    useEffect(() => {
        getData()
    }, [])

    return {
        data,
        loading,
        error
    }
}

export default useFetch;
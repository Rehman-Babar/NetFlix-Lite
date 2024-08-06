import React, { useEffect, useState } from 'react'
import { contentStore } from '../store/content';
import axios from 'axios';

const useGetTrandingContent = () => {
const [trandingContent, setTrandingContent] = useState(null);
const {contentType} = contentStore()
const [loading, setLoading] = useState(false);

useEffect(() => {
        
        const getTrandingContent = async () => {
            setLoading(true)
        try {
            const res = await axios.get(`/api/v1/${contentType}/trending`)
            setTrandingContent(res.data.content)
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    getTrandingContent();``
}, [contentType])
return {trandingContent, loading}

}

export default useGetTrandingContent
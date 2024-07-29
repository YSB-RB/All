import React, { useEffect, useState } from "react";
import axios from "axios";


export const useFetch = (ApiUrl) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetcherror, setFetcherror] = useState(null)

    useEffect(() => {
        const FetchData = async () => {
            setLoading(true)
            try {
                const result = await axios.get(ApiUrl)
                // console.log("Result from FetchApi custom Hook Data: ",result)
                setData(result.data)
            } catch (error) {
                setFetcherror("Error in FetchApi : ", error)
                alert("Failed to Fetch Data!")
                console.log("Error in Fetching Data", error)
            }
            setLoading(false)
        }
        FetchData()
    }, [ApiUrl])


    const ReFetch = async () => {
        setLoading(true)
        try {
            const result = await axios.get();
            setData(result)
        }
        catch (error) {
            setFetcherror("Error in FetchApi : ", error)
            alert("Failed to Fetch Data!")
        }
        setLoading(false)
    }

    return { data, loading, fetcherror, ReFetch }
}



export const useCreate = (ApiUrl) => {
    const [createError, setcreateError] = useState(null)

    const CreateData = async (newData) => {
        try {
            const postData = await axios.post(ApiUrl, newData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log("Created data to PostApi", postData)
            alert('Successfully Added Data!')
        } catch (error) {
            setcreateError("Error in Post Api", error)
            alert("Failed to Update Data!")
        }
    }

    return { createError, CreateData }
}



export const useUpdate = (ApiUrl) => {
    const [updateError, setUpdateError] = useState(null)

    const UpdateData = async (id, updateData) => {
        try {
            const response = await axios.put(`${ApiUrl}/${id}`, updateData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log("UpdatedData is", response)
            alert("Data Updated!")
        } catch (error) {
            setUpdateError("Error in Update Api", error)
         
            alert("Failed to Update Data!")
        }
    }
    return { updateError, UpdateData }

}



export const useDelete = (ApiUrl) => {
    const [deleteError, setDeleteError] = useState(null)

    const DeleteData = async (id) => {
        try {
            const deletedata = await axios.delete(`${ApiUrl}/${id}`)
            setData(data.filter(item => item.id !== id))     // Remove deleted item from data, Here setData is userDefined data useState funcion
            console.log("Deleted id", deletedata.data)
            alert("Data Deleted")
        } catch (error) {
            setDeleteError("Error in delete Api", error)
            console.log('Error in delete data', error)
            alert("Failed to Delete Data!")
        }
    }
    return { deleteError, DeleteData }

}
import { createContext, useState, useEffect } from 'react';

const feedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([
    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch('/feedback?_sort=id&order-desc')
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false);
    }


    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFeedback),
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
    }

    const deleteFeedback = async (id) => {
        await fetch(`/feedback/${id}`, {
            method: 'DELETE'
        })
        const newFeedbackList = feedback.filter(item => item.id !== id)
        setFeedback(newFeedbackList)
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem),
        })
        const data = response.json();
        setFeedback(feedback.map(item => {
            return item.id === id ? { ...item, ...data } : item
        }))
    }

    return <feedbackContext.Provider value={{
        addFeedback,
        deleteFeedback,
        editFeedback,
        feedback,
        feedbackEdit,
        isLoading,
        updateFeedback,
    }}>
        {children}
    </feedbackContext.Provider>
}

export default feedbackContext;
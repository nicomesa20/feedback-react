import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const feedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is from context',
            rating: 10
        },
        {
            id: 2,
            text: 'This item is from context',
            rating: 7
        },
        {
            id: 3,
            text: 'Lorem impsum',
            rating: 9
        },
        {
            id: 4,
            text: 'This item is from context',
            rating: 9.1
        },
    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback])
    }

    const deleteFeedback = (id) => {
        const newFeedbackList = feedback.filter(item => item.id !== id)
        setFeedback(newFeedbackList)
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map(item => {
            return item.id === id ? { ...item, ...updItem } : item
        }))
    }

    return <feedbackContext.Provider value={{
        addFeedback,
        deleteFeedback,
        editFeedback,
        feedback,
        feedbackEdit,
        updateFeedback,
    }}>
        {children}
    </feedbackContext.Provider>
}

export default feedbackContext;
import React from 'react'

const DisplayChild = ({ generateAPI }) => {
    const [count, setCount] = React.useState(0);

    const handleIncrement = () => {
        setCount((prev) => prev + 1)
    }
    const handleDecrement = () => {
        setCount((prev) => prev - 1)
    }
    const handleReset = () => {
        setCount(0);
    }

    React.useEffect(() => {
        generateAPI({
            count,
            handleIncrement,
            handleDecrement,
            handleReset
        })
        return () => { generateAPI(null) }
    }, [count, generateAPI])

    return (<p>Child Count: {count}</p>)
}

export default DisplayChild
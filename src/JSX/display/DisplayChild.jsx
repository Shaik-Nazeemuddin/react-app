import React from 'react'

const DisplayChild = ({ generateAPI }) => {
    const [count, setCount] = React.useState({ value: 0 });

    const handleIncrement = () => {
        setCount((prev) => ({ value: prev.value + 1 }))
    }
    const handleDecrement = () => {
        setCount((prev) => ({ value: prev.value - 1 }))
    }
    const handleReset = () => {
        setCount({ value: 0 });
    }

    React.useEffect(() => {
        generateAPI({
            count,
            handleIncrement,
            handleDecrement,
            handleReset
        })
        return () => { generateAPI(null) }
    }, [count.value, generateAPI])

    return (<p>Child Count: {count.value}</p>)
}

export default DisplayChild
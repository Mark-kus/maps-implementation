import "./BlockMap.css"

import locked from '../../assets/locked.svg'
import unlocked from '../../assets/unlocked.svg'
import { useState } from "react"

export default function BlockMap({ setMoreOptions }) {
    const [blocked, setBlocked] = useState(false)

    const handleClick = () => {
        setMoreOptions({
            draggable: !blocked
        })
        setBlocked(!blocked)
    }

    return (
        <button
            onClick={handleClick}
            className="block-button">
            {blocked ?
                <img src={unlocked} alt="" />
                : <img src={locked} alt="" />
            }
        </button>
    )
}
import "./BlockMap.css"

import locked from '../../assets/locked.svg'
import unlocked from '../../assets/unlocked.svg'
import { useState } from "react"

export default function BlockMap({ setMoreOptions }) {
    const [blocked, setBlocked] = useState(true)

    const handleClick = () => {
        setMoreOptions({
            gestureHandling: blocked ? "none" : null,
            keyboardShortcuts: blocked ? false : true,
        })
        setBlocked(!blocked)
    }

    return (
        <button
            onClick={handleClick}
            className="block-button">
            {blocked ?
                <img className="block-image" src={unlocked} alt="unlocked icon for unblocking map movement" />
                : <img className="block-image" src={locked} alt="locked icon for blocking map movement" />
            }
        </button>
    )
}
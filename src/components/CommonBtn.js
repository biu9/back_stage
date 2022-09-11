const Selected = (props) => {
    return (
        <div className="w-full bg-purple-600 rounded-lg text-white font-semibold px-6 py-2 cursor-pointer text-center h-full flex items-center justify-center whitespace-nowrap shadow-std">
            <div>{props.text}</div>
        </div>
    )
}

const Unselected = (props) => {
    return (
        <div>
            123123
        </div>
    )
}

export default function CommBtn(props) {
    if(props.selected) {
        return (
            <Selected text={props.text}/>
        )
    } else {
        return (
            <Unselected />
        )
    }
}
export default function SuccessAlert(props) {
    return (
        <div className="absolute bg-green-200 w-48 text-center flex items-center space-x-1 p-2 rounded-2xl border-2 border-green-600 left-1/2 transform -translate-x-1/2 top-16">
            <div className="bg-uploadSuccess w-4 h-4 bg-cover"/>
            <div className="text-green-600 font-semibold text-sm">{props.text}</div>
        </div>
    )
}
import CommBtn from "./CommonBtn"

export default function SideBar() {
    return (
        <div className="flex flex-col pt-24 space-y-3 p-6">
            <div className="text-2xl font-bold">选择对象</div>
            <div className="flex space-x-3">
                <div>
                    <CommBtn text="咨询者" selected={true}/>
                </div>
                <div>
                    <CommBtn text="咨询师" selected={false}/>
                </div>
            </div>
        </div>
    )
}
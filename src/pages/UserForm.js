import SideBar from "../components/SideBar";

export default function UserForm() {
    return (
        <div className="flex min-h-screen">
            <div>
                <SideBar/>
            </div>
            <div className="pt-24 p-6 bg-purple-100 w-full">
                user form
            </div>
        </div>
    )
}
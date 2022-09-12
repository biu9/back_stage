import CommBtn from "./CommonBtn"
import { showUser,showConsultant } from "../store/sideBarSlice"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router"

export default function SideBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ifShowUser = useSelector(state => state.sideBar.ifShowUser)
    const ifShowConsultant = useSelector(state => state.sideBar.ifShowConsultant)
    return (
        <div className="flex flex-col pt-24 space-y-3 p-6">
            <div className="text-2xl font-bold">选择对象</div>
            <div className="flex space-x-3">
                <div onClick={() => {
                    dispatch(showUser());
                    navigate("/UserForm")
                }}>
                    <CommBtn text="咨询者" selected={ifShowUser}/>
                </div>
                <div onClick={() => {
                    dispatch(showConsultant());
                    navigate("/ConsultantForm");
                }}>
                    <CommBtn text="咨询师" selected={ifShowConsultant}/>
                </div>
            </div>
        </div>
    )
}
import { Modal } from "@material-ui/core";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import CommBtn from "./CommonBtn";
import SuccessAlert from "./SuccessAlert";
import FailAlert from "./FailAlert";
import { closeAddConsultant } from "../store/modalSlice";

const server = "https://cyzz.fun/HeartSpace";

export default function AddConsultant() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [addSuccess,setAddSuccess] = useState(false);
    const [addFail,setAddFail] = useState(false);
    const addConsultant = useSelector(state => state.modal.addConsultant);
    const dispatch = useDispatch();

    return (
        <Modal open={addConsultant}>
            <div>
                {addSuccess ? <SuccessAlert text="添加成功"/> : null}
                {addFail ? <FailAlert text="添加失败"/> : null}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-xl p-6">
                    <div className="pb-6">
                        <div className="text-2xl font-bold">添加咨询师</div>
                        <div className="text-sm text-gray-400">请输入账号密码</div>
                    </div>
                    <div className="flex flex-col space-y-1 pb-1">
                        <div className="font-bold text-gray-600">
                            账号
                        </div>
                        <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="请输入账号"
                        className="w-full border-2 border-gray-200 rounded-xl p-2 outline-none"
                        />
                    </div>
                    <div className="font-bold text-gray-600">
                        密码
                    </div>
                    <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="请输入密码"
                    className="w-full border-2 border-gray-200 rounded-xl p-2 outline-none"
                    />
                    <div className="flex space-x-3 pt-6">
                        <div 
                        onClick={() => {
                            fetch(server+"/consultant/register",{
                                method:"POST",
                                body:JSON.stringify({
                                    "phoneNumber":username,
                                    "password":password
                                }),
                                mode:"cors",
                                credentials: 'include',
                            }).then(res => res.json()).then(res => {
                                //console.log("添加结果 : ",res);
                                if(res.code === 0) {
                                    setAddSuccess(true);
                                    setTimeout(() => {
                                        setAddSuccess(false);
                                        dispatch(closeAddConsultant());
                                    },1000);
                                } else {
                                    setAddFail(true);
                                    setTimeout(() => {
                                        setAddFail(false);
                                    },1000);
                                }
                            })
                        }}
                        className=" w-full">
                            <CommBtn selected={true} text="添加"/>  
                        </div>
                        <div 
                        onClick={() => {
                            dispatch(closeAddConsultant());
                        }}
                        className="w-full">
                            <CommBtn selected={false} text="取消"/>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
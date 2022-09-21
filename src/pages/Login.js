import CommBtn from "../components/CommonBtn"
import { useState } from "react"
import { useSelector,useDispatch } from "react-redux";
import SuccessAlert from "../components/SuccessAlert";
import FailAlert from "../components/FailAlert";
import { openErrorModal,openSuccessModal,closeErrorModal,closeSuccessModal } from "../store/modalSlice";
import { useNavigate } from "react-router";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const successLogin = useSelector(state => state.modal.successModal);
    const errorLogin = useSelector(state => state.modal.errorModal);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div>                
            {successLogin ? <SuccessAlert text="登入成功"/> : null}
            {errorLogin ? <FailAlert text="登入失敗"/> : null}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                <div className=" text-4xl font-bold">
                    欢迎访问Heartspace后台管理系统
                </div>
                <img 
                className="w-64 py-6"
                alt=""
                src="https://typora-1309407228.cos.ap-shanghai.myqcloud.com/20220921212240.png"/>
                <div className=" bg-gray-100 w-96 rounded-xl border-2 border-gray-200 p-6">
                    <div className="pb-6">
                        <div className="text-2xl font-bold">欢迎登录</div>
                        <div className="text-sm text-gray-400">请输入账号密码</div>
                    </div>
                    <div className="flex flex-col space-y-1 pb-1">
                        <div className="font-bold text-gray-600">
                            账号
                        </div>
                        <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="请输入账号"
                        className="w-full border-2 border-gray-200 rounded-xl p-2 outline-none"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="font-bold text-gray-600">
                            密码
                        </div>
                        <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="请输入密码"
                        className="w-full border-2 border-gray-200 rounded-xl p-2 outline-none"
                        />
                    </div>
                    <div className="pt-6 w-full" onClick={() => {
                        fetch("https://cyzz.fun/HeartSpace/admin/login",{
                            method: "POST",
                            mode: "cors",
                            credentials: "include",
                            body: JSON.stringify({
                                username: userName,
                                password: password
                            })
                        }).then(res => res.json()).then(data => {
                            if(data.code === 0) {
                                dispatch(openSuccessModal());
                                setTimeout(() => {
                                    dispatch(closeSuccessModal());
                                    navigate("/ConsultantForm");
                                },1000);
                            } else {
                                dispatch(openErrorModal());
                                setTimeout(() => {
                                    dispatch(closeErrorModal());
                                },1000);
                            }
                        })
                    }}>
                        <CommBtn selected={true} text="登录"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

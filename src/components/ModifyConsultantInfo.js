import { Modal } from "@material-ui/core";
import { closeModifyConsultantInfo } from "../store/modalSlice";
import CommBtn from "./CommonBtn";
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import translateKey2Chinese from "../utils/translateKey2Chinese";
import { setInitUserInfo } from "../store/consultantSlice";

const server = "https://cyzz.fun/HeartSpace";

export default function ModifyConsultantInfo() {
    const show = useSelector(state => state.modal.modifyConsultantInfo);
    const initUserInfo = useSelector(state => state.consultant.userInfo);
    const [showInfo,setShowInfo] = useState(initUserInfo);
    const modifyKey = {
        name:1,
        gender:1,
        major:1,
        education:1,
        age:1,
        tags:0
    }
    const dispatch = useDispatch();
    console.log("show info : ",showInfo);
    console.log("init user info : ",initUserInfo);
    return (
        <Modal open={show}>
            <div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-xl p-6 flex flex-col space-y-6">
                    <div className="text-2xl font-bold">编辑个人信息</div>
                    <div className="flex items-center space-x-4">
                        <div className=" w-1/4">修改头像</div>
                        <input 
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const fd = new FormData();
                            fd.append("file",file);
                            fetch(server+"/file/upload",{
                                method:"POST",
                                mode:"cors",
                                credentials: 'include',
                                body:fd,
                            }).then(res => res.json()).then(res => {
                                console.log(res);
                            })
                        }}
                        accept="image/*"
                        className="w-3/4"
                        type="file"/>
                    </div>
                    <div className="flex flex-col space-y-3">
                        {Object.keys(showInfo).map(key => {
                            if(modifyKey[key] === 1) {
                                return (
                                <div className="flex items-center space-x-4">
                                    <div className="w-1/4">{translateKey2Chinese(key)}</div>
                                    <input 
                                    value={showInfo[key]}
                                    onChange={e => {
                                        setShowInfo({
                                            ...showInfo,
                                            [key]:e.target.value
                                        })
                                    }}
                                    className="bg-gray-100 px-3   outline-none rounded-lg py-1 w-4/5"
                                    placeholder="请输入要编辑的内容"/>
                                </div>
                                )
                            } else if(modifyKey[key] === 0) {
                                return (
                                    <div className="flex flex-col pb-2">
                                        <div className="flex space-x-3 items-center">
                                            <div>擅长方向</div>
                                            <img 
                                            onClick={() => {
                                                if(showInfo[key] === null) {
                                                    setShowInfo({
                                                        ...showInfo,
                                                        [key]:[""]
                                                    });            
                                                } else {
                                                    setShowInfo({
                                                        ...showInfo,
                                                        [key]:[...showInfo[key]].concat("")
                                                    })
                                                }
                                            }}
                                            src="https://typora-1309407228.cos.ap-shanghai.myqcloud.com/add.png" 
                                            alt="" 
                                            className="w-4 h-4 cursor-pointer"/>
                                            <img
                                            src="https://typora-1309407228.cos.ap-shanghai.myqcloud.com/delete.png"
                                            alt=""
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() => {
                                                if(!showInfo[key]) {
                                                    return;
                                                }
                                                setShowInfo({
                                                    ...showInfo,
                                                    [key]:showInfo[key].slice(0,showInfo[key].length-1)
                                                })
                                            }}
                                            />
                                        </div>
                                        <div className="w-full flex flex-col space-y-2">
                                        {showInfo[key] instanceof Array ? 
                                            showInfo[key].map((tag,index) => {
                                                return (
                                                    <input
                                                    value={tag}
                                                    onChange={e => {
                                                        const newTags = [...showInfo[key]];
                                                        newTags[index] = e.target.value;
                                                        setShowInfo({
                                                            ...showInfo,
                                                            [key]:newTags
                                                        })
                                                    }}
                                                    className="bg-gray-100 px-3   outline-none rounded-lg py-1 w-full"
                                                    placeholder="请输入要编辑的内容"
                                                    />
                                                )
                                            }) : null
                                        }
                                        </div>
                                    </div>
                                    )
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    <div className="flex space-x-3 w-full">
                        <div
                        className="w-full"
                        onClick={() => {
                            dispatch(setInitUserInfo(showInfo));
                            dispatch(closeModifyConsultantInfo());
                        }}
                        >
                            <CommBtn selected={true} text="确定"/>
                        </div>
                        <div
                        className="w-full"
                        onClick={() => {
                            setShowInfo(initUserInfo);
                            dispatch(closeModifyConsultantInfo());
                        }}
                        >
                            <CommBtn selected={false} text="取消"/>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
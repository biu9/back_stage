import SideBar from "../components/SideBar";
import { useState,useEffect } from "react";
import FunctionBtn from "../components/FunctionBtn";
import SuccessAlert from "../components/SuccessAlert";
import FailAlert from "../components/FailAlert";
import { openSuccessModal,openErrorModal,closeErrorModal,closeSuccessModal } from "../store/modalSlice";
import { useDispatch,useSelector } from "react-redux";
import { setSearchParam } from "../store/searchSlice";

const server = "https://cyzz.fun/HeartSpace";

const FormHeader = () => {
    const [searchValue,setSearchValue] = useState("");
    const dispatch = useDispatch();
    return (
    <div className="flex justify-between">
        <div className="flex items-center">
            <input
            value={searchValue}
            onChange={e => {
                setSearchValue(e.target.value);
            }}
            placeholder="输入姓名/手机号进行搜索"
            className="p-3 rounded-l-lg w-64 outline-none h-10"
            />
            <div className="bg-purple-200 h-10 w-10 rounded-r-lg flex justify-center items-center">
                <div 
                onClick={() => {
                    dispatch(setSearchParam({
                        value: searchValue
                    }));
                }}
                className="bg-search w-3/4 h-3/4 bg-cover cursor-pointer"/>
            </div>
        </div>
        <div className="flex space-x-3">
            <div>
                <FunctionBtn text="添加咨询师" type="add"/>
            </div>
            <div>
                <FunctionBtn text="导出表格" type="export"/>
            </div>
        </div>
    </div>
    )
}

const FormBody = (props) => {
    return (
    <table className="table-fixed w-full">
        <thead className="border-b-2 border-purple-200 bg-white h-10">
            <tr align="left" className="">                                
                <th className="">用户姓名</th>
                <th className="">手机号</th>
                <th className="">已结案人次</th>
                <th className="">在接个案人次</th>
                <th className="">操作</th>
            </tr>
        </thead>
        <tbody>
            {props.data.map((item,index) => {
                let finished = 0;
                let unFinished = 0;
                if(item.consultations instanceof Array) {
                    item.consultations.forEach((item) => {
                        if(item.state === "已完成") {
                            finished++;
                        } else {
                            unFinished++;
                        }
                    })
                }
                const data = {
                    name: item.name ? item.name : "未填写",
                    phoneNumber: item.phoneNumber ? item.phoneNumber : "未填写",
                    finished: finished,
                    unFinished: unFinished,
                    id: item.id
                }
                return (
                    <FormList data={data}/>
                )
            })}
        </tbody>
    </table>
    )
}

const FormList = (props) => {
    const dispatch = useDispatch();
    function banOrUban(type) {
        fetch(server+"/consultant/"+type,{
            method: "POST",
            mode: "cors",
            credentials: "include",
            body:JSON.stringify({
                id: props.data.id
            })
        }).then(res => res.json()).then(res => {
            if(res.code === 0) {
                dispatch(openSuccessModal());
                setTimeout(() => {
                    dispatch(closeSuccessModal());
                },1000);                    
            } else {
                dispatch(openErrorModal());
                setTimeout(() => {
                    dispatch(closeErrorModal());
                },1000);
            }
        })
    }
    return (
        <tr className=" border-purple-200 border-b-2 h-9 w-full">
            <td>{props.data.name}</td>
            <td>{props.data.phoneNumber}</td>
            <td>{props.data.finished}</td>
            <td>{props.data.unFinished}</td>
            <td className="flex space-x-3 cursor-pointer items-center">
                <div
                onClick={() => {
                    banOrUban("ban");
                }}
                >
                    封禁
                </div>
                <div
                onClick={() => {
                    banOrUban("unban");
                }}
                >解封</div>
                <div>修改信息</div>
            </td>
        </tr>
    )
}

const FormContainer = (props) => {
    return (
        <div className="flex flex-col space-y-3">
            <FormHeader/>
            <FormBody data={props.data}/>
        </div>
    )
}

export default function ConsultantForm() {
    const [data, setData] = useState([]);
    const successOperate = useSelector(state => state.modal.successModal);
    const failOperate = useSelector(state => state.modal.errorModal);
    const value = useSelector(state => state.search.value);
    useEffect(() => {
        (async() => {
            const res = await fetch(server+"/consultant/list",{
                method: "POST",
                mode: "cors",
                credentials: "include",
                body:JSON.stringify({
                    pageNum:0,
                    pageSize:100,
                    name:null ,// null表示不筛选
                    phoneNumber:null, //null表示不筛选
                })
            });
            const json = await res.json();
            setData(json.data);
        })()
    },[value]);
    return (
        <div className="flex min-h-screen">
            {successOperate ? <SuccessAlert text="操作成功" /> : null}
            {failOperate ? <FailAlert text="操作失败"/> : null}
            <div>
                <SideBar/>
            </div>
            <div className="pt-24 p-6 bg-purple-100 w-full px-20">
                <FormContainer data={data}/>
            </div>
        </div>
    )
}
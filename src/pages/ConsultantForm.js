import SideBar from "../components/SideBar";
import { useState,useEffect } from "react";
import FunctionBtn from "../components/FunctionBtn";

const server = "https://cyzz.fun/HeartSpace";

const FormHeader = () => {
    return (
    <div className="flex justify-between">
        <div className="flex items-center">
            <input
            placeholder="输入姓名/手机号进行搜索"
            className="p-3 rounded-l-lg w-64 outline-none h-10"
            />
            <div className="bg-purple-200 h-10 w-10 rounded-r-lg flex justify-center items-center">
                <div className="bg-search w-3/4 h-3/4 bg-cover cursor-pointer"/>
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

const FormContainer = (props) => {
    console.log("show data",props.data);
    return (
        <div>
            <FormHeader/>
        </div>
    )
}

export default function ConsultantForm() {
    const [data, setData] = useState([]);
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
    },[]);
    return (
        <div className="flex min-h-screen">
            <div>
                <SideBar/>
            </div>
            <div className="pt-24 p-6 bg-purple-100 w-full px-20">
                <FormContainer data={data}/>
            </div>
        </div>
    )
}
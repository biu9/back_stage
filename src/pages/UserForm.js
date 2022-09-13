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
                <div 
                className="bg-search w-3/4 h-3/4 bg-cover cursor-pointer"/>
            </div>
        </div>
        <div className="flex space-x-3">
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
                <th >用户姓名</th>
                <th >所属咨询师</th>
                <th >手机号</th>
                <th >咨询状态</th>
                <th >危机状况</th>
                <th >操作</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    )
}

const FormContainer = () => {
    return (
    <div  className="flex flex-col space-y-3">
        <FormHeader/>
        <FormBody/>
    </div>
    )
}

export default function UserForm() {
    const [data, setData] = useState();
    useEffect(() => {
        (async() => {
            const res = await fetch(server+"/user/list",{
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
    console.log("show data : ",data);
    return (
        <div className="flex min-h-screen">
            <div>
                <SideBar/>
            </div>
            <div className="pt-24 p-6 bg-purple-100 w-full px-20">
                <FormContainer/>
            </div>
        </div>
    )
}
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
            {   
            props.data instanceof Array ? 
                props.data.map(item => {
                    const res = []
                    if(item.consultations) {
                        item.consultations.map(consultation => {
                            let crisisSituation = "";
                            if(consultation.consultRecords instanceof Array) {
                                crisisSituation = consultation.consultRecords[consultation.consultRecords.length - 1].crisisSituation;
                            }
                            res.push((
                                <tr className=" border-purple-200 border-b-2 h-9 w-full">
                                <td>{item.name}</td>
                                <td>咨询师姓名</td>
                                <td>{item.phoneNumber}</td>
                                <td>{consultation.state}</td>
                                <td>{crisisSituation}</td>
                                <td>
                                    <div className="cursor-pointer">查看</div>
                                </td>
                            </tr>
                            ))
                            return null;
                        })
                    }
                    return (res)
                })
            : null 
            }
        </tbody>
    </table>
    )
}

const FormContainer = (props) => {
    return (
    <div  className="flex flex-col space-y-3">
        <FormHeader/>
        <FormBody data={props.data}/>
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
                <FormContainer data={data}/>
            </div>
        </div>
    )
}
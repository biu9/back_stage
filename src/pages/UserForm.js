import SideBar from "../components/SideBar";
import { useState,useEffect } from "react";
import FunctionBtn from "../components/FunctionBtn";
import { setSymptom,setConsultation } from "../store/consultationSlice";
import UserInfoModal from "../components/UserInfoModal";
import { openUserInfoModal } from "../store/modalSlice";
import { useDispatch,useSelector } from "react-redux";
import { openModifyCrisisSituation } from "../store/modalSlice";
import ChangeCrisisSituation from "../components/ChangeCrisisSituation";
import { setSearchParam } from "../store/searchSlice";
import { exportExcel } from "../utils/exportExcel";

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
            <div className="bg-green-200 h-10 w-10 rounded-r-lg flex justify-center items-center">
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
            <div
            onClick={() => {
                exportExcel('/user/export');
            }}
            >
                <FunctionBtn text="导出表格" type="export"/>
            </div>
        </div>
    </div>
    )
}

const FormBody = (props) => {
    return (
    <table className="table-fixed w-full">
        <thead className="border-b-2 border-green-200 bg-white h-10">
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
                            /*res.push((
                            <tr className=" border-green-200 border-b-2 h-9 w-full">
                                <td>{item.name}</td>
                                <td>{name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{consultation.state}</td>
                                <td>{crisisSituation}</td>
                                <td className="flex space-x-3">
                                        <div 
                                    onClick={() => {
                                        //console.log("symptom : ",consultation.Symptom);
                                        dispatch(setSymptom(consultation.Symptom));
                                        dispatch(openUserInfoModal());
                                    }}
                                    className="cursor-pointer">查看
                                    </div>
                                    <div
                                    onClick={() => {
                                        dispatch(openModifyCrisisSituation());
                                        dispatch(setConsultation(consultation));
                                    }}
                                    className="cursor-pointer">
                                        危机个案
                                    </div>
                                </td>
                            </tr>
                            ));*/
                            res.push(<FormList item={item} consultation={consultation} crisisSituation={crisisSituation}/>)
                            return null;          
                        })
                    }
                    return (res);
                })
            : null 
            }
        </tbody>
    </table>
    )
}

const FormList = (props) => {
    const dispatch = useDispatch();
    const [name,setName] = useState("");
    useEffect(() => {
        (async() => {
            const name = await getConsultantName(props.consultation.ConsultantId);
            setName(name);
        })()
    },[props.consultation.ConsultantId])
    return (
    <tr className=" border-green-200 border-b-2 h-9 w-full">
        <td>{props.item.name}</td>
        <td>{name}</td>
        <td>{props.item.phoneNumber}</td>
        <td>{props.consultation.state}</td>
        <td>{props.crisisSituation}</td>
        <td className="flex space-x-3">
                <div 
            onClick={() => {
                //console.log("symptom : ",consultation.Symptom);
                dispatch(setSymptom(props.consultation.Symptom));
                dispatch(openUserInfoModal());
            }}
            className="cursor-pointer">查看
            </div>
            <div
            onClick={() => {
                dispatch(openModifyCrisisSituation());
                dispatch(setConsultation(props.consultation));
            }}
            className="cursor-pointer">
                危机个案
            </div>
        </td>
    </tr>
    )
}

async function getConsultantName(id) {
    const res = await fetch(server+"/consultant/get",{
        method: "POST",
        mode: "cors",
        credentials: "include",
        body:JSON.stringify({
            id: id
        })
    });
    const resJson = await res.json();
    return resJson.data.name;
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
    const modalStateChange = useSelector(state => state.modal.modifyCrisisSituation);
    const value = useSelector(state => state.search.value);
    useEffect(() => {
        (async() => {
            const searchParam = {
                name: null,
                phoneNumber: null
            };
            if(value === null || value === "") {
                searchParam.name = null;
                searchParam.phoneNumber = null;
            } else if(value[0].charCodeAt() >= 48 && value[0].charCodeAt() <= 57) {
                searchParam.name = null;
                searchParam.phoneNumber = value;
            } else {
                searchParam.name = value;
                searchParam.phoneNumber = null;
            }
            const res = await fetch(server+"/user/list",{
                method: "POST",
                mode: "cors",
                credentials: "include",
                body:JSON.stringify({
                    pageNum:0,
                    pageSize:100,
                    name:searchParam.name ,// null表示不筛选
                    phoneNumber:searchParam.phoneNumber, //null表示不筛选
                })
            });
            const json = await res.json();
            setData(json.data);
        })()
    },[modalStateChange,value]);
    console.log("show data : ",data);
    return (
        <div className="flex min-h-screen">
            <UserInfoModal/>
            <ChangeCrisisSituation/>
            <div>
                <SideBar/>
            </div>
            <div className="pt-24 p-6 bg-green-100 w-full px-20">
                <FormContainer data={data}/>
            </div>
        </div>
    )
}
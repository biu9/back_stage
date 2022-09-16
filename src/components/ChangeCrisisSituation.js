import { Modal } from "@material-ui/core";
import { useSelector,useDispatch } from "react-redux";
import CommBtn from "./CommonBtn";
import { useState } from "react";
import { closeModifyCrisisSituation } from "../store/modalSlice";

const server = "https://cyzz.fun/HeartSpace";

export default function ChangeCrisisSituation() {
    const [situation,setSituation] = useState("");
    const dispatch = useDispatch();
    const ifShow = useSelector(state => state.modal.modifyCrisisSituation);
    const consultation = useSelector(state => state.consultation.consultation);
    return (
        <Modal open={ifShow}>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-xl p-6 flex flex-col space-y-6">
                <div className="text-2xl font-bold">编辑危机情况</div>
                <div className="flex space-x-3">
                    <div>危机情况</div>
                    <select 
                    onBlur={(e) => setSituation(e.target.value)}
                        className="bg-gray-100 rounded-lg px-3 py-1 w-60">
                            <option value="-1"></option>
                            <option value="0无危机">0无危机</option>
                            <option value="1有危机">1有危机</option>
                    </select>
                </div>
                <div className="flex space-x-3">
                    <div 
                    onClick={() => {
                        dispatch(closeModifyCrisisSituation());
                    }}
                    className="w-full">
                        <CommBtn selected={false} text="取消"/>
                    </div>
                    <div 
                    onClick={() => {
                        dispatch(closeModifyCrisisSituation());
                        updateCrisisSituation(situation,consultation);
                    }}
                    className="w-full">
                        <CommBtn selected={true} text="确定"/>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

function updateCrisisSituation(situation,consultation) {
    console.log("consultaton.consultRecords instanceof Array ? ",consultation.consultRecords instanceof Array);        
    const tmpConsultation = JSON.parse(JSON.stringify(consultation));
    if(tmpConsultation.consultRecords instanceof Array) {
        const len = tmpConsultation.consultRecords.length;
        tmpConsultation.consultRecords[len-1].crisisSituation = situation;    
        fetch(server+"/consultation/update",{
            method:"POST",
            mode:"cors",
            credentials:"include",
            body:JSON.stringify(tmpConsultation)
        }).then(res => res.json()).then(res => {
            console.log("update res : ",res);
            if(res.code === 0) {
                alert("修改成功");
            } else {
                alert("修改失败");
            }
        })
    }
}
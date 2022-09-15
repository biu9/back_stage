import { Modal } from "@material-ui/core";
import { useSelector,useDispatch } from "react-redux";
import translateKey2Chinese from "../utils/translateKey2Chinese";
import CommBtn from "./CommonBtn";
import { closeUserInfoModal } from "../store/modalSlice";

export default function UserInfoModal() {
    const symptom = useSelector(state => state.consultation.symptom);
    const ifOpen = useSelector(state => state.modal.userInfoModal);
    const dispatch = useDispatch();
    const symptomKey = {
            "theme":1,
            "sleepingQuality":1,
            "eatingCondition":1,// 饮食状况（x
            "injuringThought":1,
            "injuringAction":1,
            "suicideThought":1,
            "suicideAction":1,
            "familyHistory":1,
            "diagnosis":1,
    };
    return (
        <Modal open={ifOpen}>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-xl p-6 flex flex-col space-y-1">
                <div className="text-2xl font-bold">查看咨询者信息</div>
                <div>主要想解决的问题</div>
                <div>{symptom.mainDesc}</div>
                {(() => {
                    const res = []
                    for(const key in symptomKey) {
                        res.push(
                        <div className="flex space-x-3">
                            <div>{translateKey2Chinese(key)}</div>
                            <div>{symptom.descriptions[key]}</div>
                        </div>);
                    }
                    return res;
                })()}
                <div>备注</div>
                <div>{symptom.optionInfo}</div>
                <div
                onClick={() => {
                    dispatch(closeUserInfoModal());
                }} 
                className="w-full">
                    <CommBtn selected={true} text="确定"/>
                </div>
            </div>
        </Modal>
    )
}
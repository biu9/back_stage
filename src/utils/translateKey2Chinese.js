export default function translateKey2Chinese(key) {
    switch(key) {
        case "name":
            return "姓名";
        case "gender":
            return "性别";
        case "age":
            return "年龄";
        case "education":
            return "学历";
        case "major":
            return "流派";
        case "tags":
            return "擅长方向";
        case "theme":
            return "咨询主题";
        case "sleepingQuality":
            return "睡眠质量";
        case "eatingCondition":
            return "饮食状况";
        case "injuringThought":
            return "自伤想法";
        case "injuringAction":
            return "自伤行为";
        case "suicideThought":
            return "自杀想法";
        case "suicideAction":
            return "自杀行为";
        case "familyHistory":
            return "家族精神病史";
        case "diagnosis":
            return "精神科确诊经历";
        default:
            return "";
    }
}
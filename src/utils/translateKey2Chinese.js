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
        default:
            return "";
    }
}
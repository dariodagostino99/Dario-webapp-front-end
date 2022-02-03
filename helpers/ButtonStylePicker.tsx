export default class ButtonStylePicker {
    static pickStyle(style: string) {
        switch (style) {
            case "create":
                return {backgroundColor: "#9DF58E", hoverBackgroundColor: "#47F527", hoverColor: "white"};
            case "edit":
                return {backgroundColor: "#7278EC", hoverBackgroundColor: "#151FEE", hoverColor: "white"};
            case "delete":
                return {backgroundColor: "#F07171", hoverBackgroundColor: "#F10C0C", hoverColor: "black"};
            case "return":
                return {backgroundColor: "#7278EC", hoverBackgroundColor: "#151FEE", hoverColor: "white"};
        }
    }

    static choseSize(size: string){
        switch (size){
            case "small":
                return "200px";
            case "regular":
                return "400px";
            case "large":
                return "600px";
        }
    }
}
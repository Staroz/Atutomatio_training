
    // FUNCTIONS 
export function getId(arr, boardName) {
    let ans = "";
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element.name === boardName) {
            ans = element.id;
            break;
        } else {
            ans = "ERROR, THIS BOARD NAME DOESN'T EXIT";
        }
    }
    return ans;
};

export function getWSId(arr, displayName) {
    let ans = "";
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element.displayName === displayName) {
            ans = element.id;
            break;
        } else {
            ans = "ERROR, THIS WORK SPACE NAME DOESN'T EXIT";
        }
    }
    return ans;
};
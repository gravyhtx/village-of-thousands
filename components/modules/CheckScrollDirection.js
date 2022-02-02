window.addEventListener('wheel', checkScrollDirection);

let wheelDelta = (e) => {return e.wheelDelta}
let deltaY = (e) => {return e.deltaY}
let moveNav = false;
let scrollCount = 0;


export function checkScrollDirection(e) {
    if (checkScrollDirectionIsUp(e) && scrollCount < 20) {
        moveNav = true;
        console.log("moveNav", "up");
        
    } else {
        moveNav = false;
        console.log("moveNav", "down");
    }
}


export function checkScrollDirectionIsUp(e) {
    if (e.wheelDelta) {
        return wheelDelta(e) > 0;
    }
    return deltaY(e) < 0;
}
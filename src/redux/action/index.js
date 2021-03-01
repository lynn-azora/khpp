//action类型
export const type = {
    SWITH_MENU:'SWITH_MENU'
}

export function switchMenu(menuName){
    return {
        type:type.SWITH_MENU,
        menuName
    }
}
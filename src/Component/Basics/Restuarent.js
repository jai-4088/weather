import React, { useState } from 'react'
import "./Style.css";
import Menu from '../../menuApi';
import MenuCard from './MenuCard';
import Navbar from './Navbar';

const uniuqeList = [...new Set(Menu.map((curElem) => {
    return curElem.category;
})
), "All",
];
console.log(uniuqeList)
const Restuarent = () => {

    const [menuData, setMenuData] = useState(Menu);
    const [menulist, setMenuList] = useState(uniuqeList)
    console.log(menuData)

    const filterItem = (category) => {

        if (category === "All") {
            setMenuData(Menu);
            return;
        }
        const updatedList = Menu.filter((curElem) => {
            return curElem.category === category
        });
        setMenuData(updatedList);
    }

    return (
        <>

            <Navbar filterItem={filterItem} menuList={menulist} />
            <MenuCard menuData={menuData} />
        </>
    )
}

export default Restuarent
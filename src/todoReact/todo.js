import React, { useEffect, useState } from 'react'
import "./styles.css";
const Todo = () => {

    // get the items into local storage
    const getLocalData = () => {
        const lists = localStorage.getItem("mytodoList");

        if (lists) {
            return JSON.parse(lists)
        } else {
            return [];
        }
    };

    const [inputdata, setInputData] = useState("");

    const [items, setItems] = useState(getLocalData());
    // for edit the item 
    const [isEditItem, setIsEditItem] = useState();
    // for edit toggle button
    const [toggleButton, setToggleButton] = useState(false);

    // Add Item function
    const addItem = () => {
        if (!inputdata) {
            alert("plz fill the data")
        } else if (inputdata && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputdata };
                    }
                    return curElem;
                })
            );
            setInputData([]);
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata
            }
            setItems([...items, myNewInputData]);
            setInputData("")
        }
    }
    // edit the items of list
    const editItem = (index) => {
        const todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);

    };
    // how to delete items
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItems);
    };
    // remove All the Elements from list

    const removeAll = () => {
        setItems([]);
    };

    // adding local Storage
    useEffect(() => {
        localStorage.setItem("mytodoList", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="./Images/todo.svg" alt="todo" />
                        <figcaption>Add your list here👌</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='✍️ Add Item' value={inputdata} onChange={(event) => setInputData(event.target.value)} className='form-control'
                        />
                        {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i> :
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>}

                    </div>
                    {/* Show our items */}
                    <div className='showItems'>
                        {items.map((curElem, index) => {
                            return (
                                <div className='eachItem' key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    {/* Remove all button */}
                    <div className="showItems"><button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                        <span>CHECK LIST</span>
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo

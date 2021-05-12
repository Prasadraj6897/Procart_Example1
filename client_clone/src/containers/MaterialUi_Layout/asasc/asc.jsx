import React, { useState } from 'react';
import './style.css';



const Modal = (props) => {
    if (!props.visible) {
        return null;
    }
    return (
        <>
            <div className="modalFixedBg">
                <div style={{ position: 'relative' }}>
                    <div className="modalClose" onClick={props.onClose}>X</div>
                    <div className="modalContainer">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

const MaterialInput = (props) => {
    const [focus, setFocus] = useState(false);

    return (
        <div className="materialInput">
            <label className={`label ${focus ? 'focus' : ''}`} style={{
                top: 0,
                lineHeight: 'none'
            }}>{props.label}</label>
            <div style={{
                display: 'flex'
            }}>
                <input className="input"
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    onFocus={(e) => {
                        setFocus(true)
                    }}
                    onBlur={(e) => {
                        if(e.target.value === ""){
                            setFocus(false)
                        }
                    }} />
                {
                    props.rightElement ? props.rightElement : null
                }
            </div>
        </div>
    )
}

const MaterialButton = (props) => {
    return (
        <div style={{ width: '90%' }}>
            <button
                className="materialButton"
            >
                {props.title && props.title}
            </button>
        </div>

    )
}

const DropdownMenu = (props) => {
    return (
      <div className="headerDropdownContainer">
        {props.menu}
        <div className="dropdown">
          <div className="upArrow"></div>
          {props.firstMenu}
          <ul className="headerDropdownMenu">
            {
              props.menus && props.menus.map((item, index) =>
                <li key={index}><a href={item.href}>{item.label}</a></li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }

export {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu
}

/* Material Modal */
// .modalFixedBg {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: #000;
//     background-color: rgba(0, 0, 0, 0.6);
//     z-index: 12;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
//   .modalContainer {
//     min-width: 400px;
//     max-width: 90%;
//     min-height: 200px;
//     max-height: 90vh;
//     background: #fff;
//     border-radius: 4px;
//     margin: 0 auto;
//     overflow-x: hidden;
//   }
//   .modalClose {
//     position: absolute;
//     color: #fff;
//     right: 15px;
//     font-size: 20px;
//   }
  
//   /* Material Input */
//   .materialInput {
//     width: 100%;
//     min-width: 300px;
//     height: 30px;
//     border-bottom: 2px solid #2874f0;
//     position: relative;
//     /* background-color: red; */
//     margin-top: 25px;
//   }
//   .materialInput input {
//     width: 100%;
//     flex: 1;
//     outline: none;
//     border: none;
//     z-index: 1;
//     background: transparent;
//     line-height: 30px;
//   }
//   .materialInput .label {
//     position: absolute;
//     line-height: 30px;
//     color: grey;
//     z-index: 0;
//     font-size: 12px;
//     letter-spacing: 1px;
//     transition: all 0.1s ease-in-out;
//   }
//   .materialInput .label.focus {
//     top: -20px !important;
//   }
  
//   /* Material Button */
//   .materialButton {
//     width: 100%;
//     display: inline-block;
//     padding: 15px;
//     font-size: 15px;
//     outline: none;
//     background-color: #fb641b;
//     color: #ffffff;
//     box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
//     border: none;
//     cursor: pointer;
//     border-radius: 2px;
//   }
//   .materialButton:hover {
//     box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.12);
//   }
  
//   /* Material dropdown */
//   .headerDropdownContainer {
//     position: relative;
//     display: inline-block;
//   }
//   .firstmenu {
//     padding: 15px 20px;
//     border-bottom: 1px solid #eee;
//     font-size: 12px;
//     font-weight: 500;
//     display: flex;
//     justify-content: space-between;
//   }
  
//   .dropdown {
//       position: relative;
//       display: inline-block;
//     }
    
//     .dropdown-content {
//       display: none;
//       position: absolute;
//       background-color: #f1f1f1;
//       min-width: 160px;
//       box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
//       z-index: 1;
//       margin-top: 5px;
//     }
    
//     .dropdown-content a {
//       color: black;
//       padding: 12px 16px;
//       text-decoration: none;
//       display: block;
//     }
    
//     .dropdown-content a:hover {background-color: #ddd;}
    
//     .dropdown:hover .dropdown-content {display: block;}
    
//     /* .dropdown:hover .dropbtn {background-color: #3e8e41;} */
//   .dropdownMenu {
//     background: #fff;
//     box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
//     background: #fff;
//     border-radius: 2px;
//   }
//   .headerDropdownContainer:hover .dropdown {
//     display: inline-block;
//   }
//   .upArrowContainer {
//     position: relative;
//     width: 100%;
//     height: 10px;
//     background-color: #fb641b;
//   }
//   .upArrow {
//     width: 0;
//     height: 0;
//     position: absolute;
//     border-left: 10px solid transparent;
//     border-right: 10px solid transparent;
//     border-bottom: 10px solid #ffffff;
//     left: 50%;
//     transform: translateX(-50%);
//   }
//   .headerDropdownMenu {
//     margin: 0;
//     padding: 0;
//     background: #fff;
//   }
//   .headerDropdownMenu li {
//     list-style: none;
//   }
//   .headerDropdownMenu li a {
//     display: block;
//     padding: 15px 20px;
//     box-sizing: border-box;
//     font-size: 14px;
//     border-bottom: 1px solid #eee;
//     color: #212121;
//     text-decoration: none;
//   }
//   .headerDropdownMenu li a:hover {
//     background-color: #f0f0f0;
//     cursor: pointer;
//   }
  
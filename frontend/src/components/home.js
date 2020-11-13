import React, { useState, useEffect } from 'react';
import {Dropdown} from 'react-bootstrap'
import defaultImg from '../images/default.png'



const Home = () => {

    return (
        <div className='container'>
            <div style={boxStyle}>
                <div style={headStyle}>
                    <img src={defaultImg} style={{width:"10%", display:"inline"}}/>
                    <p style={{display:"inline",padding:"2%"}}>Thanapun Yan-amporn</p>
                    <Dropdown style={{display:"inline",position:"absolute",right:"0px"}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                            </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">edit</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <textarea className="form-control" aria-label="With textarea" style={{marginTop:"2%",height:"200px"}}></textarea>
            </div>
            
        </div>
    );
}

const boxStyle = {
    width:"70%",
    margin: "auto",
    padding: "5%",
    border:"solid black"
}
const headStyle ={
    position:"relative",
    paddingRight: "0%"
}

export default Home;
import React from 'react';
function HelloWorld() {
    let syntax="JSX"
    return (
        <p>
            <h1>Welcome to {syntax} JSX syntax - HelloWorld component</h1>
        </p>
    )
}

class Hello extends React.Component{
    render(){
        return(
            <div>
                <hr/>
                <p>
                    Hello component
                </p>
            </div>
        )
    }
}
export default HelloWorld;
export {Hello}
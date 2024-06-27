export default function MyComponent(props) {
    return (
        <div>
            <hr/>
            <h1>This My Component</h1>
            {props.children}
        </div>
    );
}
function First() {
    return(
        <div>
            First Component
        </div>
    );
}

function Second() {
    return(
        <div>
            Second Component
        </div>
    );
}

//chỉ định 2 component First, Second trong cùng không gian sử dụng (Namespace)

MyComponent.TheFirst = First;
MyComponent.TheSecond = Second;
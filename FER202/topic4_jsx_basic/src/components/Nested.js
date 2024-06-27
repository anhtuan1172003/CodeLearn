export default function Section(props) {
    return (
        <section>
            <h1>Nested component</h1>
            {props.children}
        </section>
    );
}

function Button(props) {
    return(
        <button>
            {props.children}
        </button>
    );
}

export {Button};
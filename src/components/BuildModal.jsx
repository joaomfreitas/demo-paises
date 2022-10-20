import React, { useEffect, useRef } from 'react';

function BuildModal(props) {
    const node = useRef();

    useEffect(() => {
        // onMount adicionar evento
        document.addEventListener("mousedown", handleClick);
        // chamado aquando o desmontar do componente
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            // Detecta que o click foi feito dentro do conteudo do modal
            return
        }
        // click feito fora, chama função declarada no componente pai
        props.openPortal();
    };

    return (
        <div className='modal'>
            <span className='close' onClick={() => { props.openPortal() }}>&times;</span>
            <img className='modal-content' src={props.image} ref={node} alt="image-modal" />
        </div>
    )
}

export default BuildModal
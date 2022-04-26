import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = React.useState({
    value:'',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      confirmed: true,
      error: false,
    });
  };
  const onError = () => {
    setState({
      ...state,
      error: true,
    });
  };
  const undoLoad = () => {
    setState((prevState) => ({
      ...prevState,
      loading: false
    }));
  };
  const onWrite = (newValue) => {
    setState({
      ...state,
      value:newValue.target.value});
  };
  const onCheck = () => {
    setState({
      ...state,
      loading: true
    });
  };
  const onDelete = () => {
    setState({
      ...state,
      deleted: true
    });
  };
  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: ''
    });
  }

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError();           
        } else {
          onConfirm();
        }
        undoLoad();
      }, 3000)
    }

  }, [state.loading])

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo de seguridad.</p>
        {(state.error && !state.loading) && (
          <p>Error: el código es incorrecto</p>
        )}
        {state.loading && (
          <p>Cargando...</p>
        )}
        <input 
          placeholder="Código de seguridad"
          value={state.value}
          onChange={(event) => {
            onWrite(event);
          }}
        />
        <button
          onClick={() => 
            onCheck()
          }
        >
          Comprobar
        </button>
      </div> 
    );
  } else if (!state.deleted && state.confirmed) {
    return (
      <React.Fragment>
        <p>¿Segur@ que desea eliminar el estado?</p>
        <button
          onClick={() =>
            onDelete()
          }
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            onReset()
          }}
        >No, eliminar</button>
      </React.Fragment>
    );
  } else {
    return(
      <React.Fragment>
        <p>Eliminado con Exitó</p>
        <button
          onClick={() => {
            onReset();
          }}
        >Recuperar Estado</button>
      </React.Fragment>
    );
  }
}

export { UseState };
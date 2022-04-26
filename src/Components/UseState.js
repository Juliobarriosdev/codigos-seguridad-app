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

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          setState({
            ...state,
            error: true,
          });           
        } else {
          setState({
            ...state,
            confirmed: true,
            error: false,
          });
        }
        setState((prevState) => ({
          ...prevState,
          loading: false
        }));
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
            setState({
              ...state,
              value:event.target.value})
          }}
        />
        <button
          onClick={() => setState({
            ...state,
            loading: true
          })}
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
          onClick={() => {
            setState({
              ...state,
              deleted: true
            });
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              value: ''
            });
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
            setState({
              ...state,
              confirmed: false,
              deleted: false,
              value: ''
            });
          }}
        >Recuperar Estado</button>
      </React.Fragment>
    );
  }
}

export { UseState };
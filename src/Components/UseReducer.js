import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

/*   const onConfirm = () => {
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
  } */

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          dispatch({type:'ERROR'});           
        } else {
          dispatch({type:'CONFIRM'});           
        }
        dispatch({type: 'UNDO_LOAD'});
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
            dispatch({type:'WRITE', payload: event.target.value}); 
          }}
        />
        <button
          onClick={() => 
            dispatch({type:'CHECK'})      
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
            dispatch({ type: 'DELETE'})
          }
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            dispatch({ type: 'RESET'})
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
            dispatch({ type: 'RESET'})
          }}
        >Recuperar Estado</button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value:'',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
};

const reducerIf = (state, action) => {
  if(action.type === 'ERROR') {
    return{
      ...state,
      error: true,
      loading: false,
    };
  } else if(action.type === 'CHECK') {
      return {
        ...state,
        loading: true
      };
  } else {
    return {
      ...state
    }
  }
};

const reducerSwtich = (state, action) => {
  switch(action.type) {
    case 'ERROR':
      return {
        ...state,
        error: true,
        loading: false,
      };
    case 'CHECK':
      return {
        ...state,
        loading: true
      }
    default:
      return {
        ...state,
      };
  }
};

const reducerObject = (state, payload) => ({
  'CONFIRM': {
    ...state,
    confirmed: true,
    error: false,
  },
  'WRITE': {
    ...state,
    value: payload 
  },
  'UNDO_LOAD': {
    ...state,
    loading: false
  },
  'ERROR': {
    ...state,
    error: true,    
  },
  'CHECK': {
    ...state,
    loading: true
  },
  'DELETE': {
    ...state,
    deleted: true
  },
  'RESET': {
    ...state,
    confirmed: false,
    deleted: false,
    value: ''
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type]
  } else {
    return state;
  }
};

export { UseReducer };

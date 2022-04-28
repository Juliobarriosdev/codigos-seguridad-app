import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  
  const onConfirm = () => dispatch({type :actionTypes.confirm}); 
  const onError = () => dispatch({type :actionTypes.error});
  const undoLoad = () => dispatch({type :actionTypes.undo_load});
  const onCheck = () => dispatch({type :actionTypes.check});
  const onDelete = () => dispatch({ type :actionTypes.delete});
  const onReset = () => dispatch({ type :actionTypes.reset})

  const onWrite = ({ target: { value } }) => {
    dispatch({ type :actionTypes.write, payload: value });
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

  if (!state.delete && !state.confirmed) {
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
          onChange={onWrite}
        />
        <button
          onClick={onCheck}
        >
          Comprobar
        </button>
      </div> 
    );
  } else if (!state.delete && state.confirmed) {
    return (
      <React.Fragment>
        <p>¿Segur@ que desea eliminar el estado?</p>
        <button
          onClick={onDelete}
        >
          Sí, eliminar
        </button>
        <button
          onClick={onReset}
        >No, eliminar</button>
      </React.Fragment>
    );
  } else {
    return(
      <React.Fragment>
        <p>Eliminado con Exitó</p>
        <button
          onClick={onReset}
        >Recuperar Estado</button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value:'',
  error: false,
  loading: false,
  delete: false,
  confirmed: false
};

const actionTypes = {
  confirm: 'CONFIRM',
  undo_load: 'UNDO_LOAD',
  error: 'ERROR',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET',
}

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
  [actionTypes.confirm]: {
    ...state,
    confirmed: true,
    error: false,
  },
  [actionTypes.write]: {
    ...state,
    value: payload 
  },
  [actionTypes.undo_load]: {
    ...state,
    loading: false
  },
  [actionTypes.error]: {
    ...state,
    error: true,    
  },
  [actionTypes.check]: {
    ...state,
    loading: true
  },
  [actionTypes.delete]: {
    ...state,
    delete: true
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    delete: false,
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

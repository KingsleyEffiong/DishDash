import { createContext, useContext, useReducer } from "react"
import PropTypes from "prop-types";
Provider.propTypes = {
  children: PropTypes.any.isRequired, 
  };

const AppProvider = createContext()
const initialState = {
    launchScreen : true,
    activeCookingLevel:null,
    darkTheme:false,
    recipeData: [],
    alligiesData: [],
}



function Provider({children}) {
function reducer(state, action){
    switch(action.type){
        case 'launchScreen' :
            return{
                ...state,
                launchScreen: action.payload
            }
        case 'activeCookingLevel' :
            return{
                ...state,
                activeCookingLevel: action.payload
            }
        case 'recipeData' :
            return{
                ...state,
                recipeData: action.payload
            }
        case 'alligiesData' :
            return{
                ...state,
                alligiesData: action.payload
            }
        case 'darkTheme' :
            return{
                ...state,
                darkTheme: action.payload
            }
            default:
            return state; 
    }
}
    const [{launchScreen, activeCookingLevel, darkTheme, recipeData, alligiesData}, dispatch] = useReducer(reducer, initialState)
    return (
        <AppProvider.Provider  value={{
            launchScreen,
            activeCookingLevel,
            darkTheme,
            recipeData,
            alligiesData,
            dispatch,
        }}>
            {children}
        </AppProvider.Provider>
    )
}
function useProvider(){
    const context = useContext(AppProvider);
    if(context === undefined) throw new Error('PostContext was used outside the postProvider');
    return context
}

export  {Provider, useProvider}

import {createContext, useContext} from 'react';
import FirebaseViewModel from '../viewModels/FirebaseViewModel';

const FirebaseContext = createContext();
export const FirebaseProvider = ({children}) => {
  const firebase = FirebaseViewModel();
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};
export const useFirebaseData = () => useContext(FirebaseContext);

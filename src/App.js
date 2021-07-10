
import '../src/App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useState} from 'react';
import Login from './Login';
import {useStateValue} from './StateProvider';

function App() {
  const [{user}, dispatch] = useStateValue();
  return (
    //BEM naming covention

    <div className="app">

      <div className="app__body" >
      {/* Setting up routes  */}
        {!user?(
          <Login/>
        ):(
          <Router>
        <Sidebar />
          <Switch>
            {/* Using parameter roomId so that it can be pulled later*/}
            <Route path="/rooms/:roomId">
            <Chat />
            </Route>
            <Route path="/">
              {/* <h1>home</h1> */}
            </Route>
          </Switch>
        </Router>
        )}
        
      </div>
    </div>
  );
}

export default App;

import axios from 'axios';
import { Fragment, useState } from 'react';
import './App.css';
import Button from './components/Button';

function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [activeLink, setActiveLink] = useState(0);
  const getUser = () => {
    setActiveLink(0);
    setLoading(true);
    axios.get('https://randomuser.me/api/')
      .then(res => {
        console.log(res.data.results)
        setUsers(res.data.results);
      }).catch(error => {
        console.log(error.message);
        setLoading(true);
      }).finally(() => {
        setLoading(false);
        setActiveUser(true);
      })

  }

  const icons = [
    'fas fa-user fa-2x',
    'fas fa-envelope fa-2x',
    'fas fa-calendar fa-2x',
    'fas fa-map-marker fa-2x',
    'fas fa-phone fa-2x',
    'fas fa-lock fa-2x',
  ]
  const UserDetails = ({ user }) => {
    const details = [
      `Hello, I am ${user.name.first} ${user.name.last}`,
      `My Email is ${user.email}`,
      `I was born ${user.dob.date.slice(0, 10)}`,
      `I live in ${user.location.country}`,
      `My Contact No. is ${user.phone}`,
      `My password is ${user.login.password}`,
    ]
    return <h2 style={style}>{details[activeLink]}</h2>
  }

  const activeLinkHandler = (index) => {
    setActiveLink(index);
  }

  const style = {
    color: "#FEA82F",
  }
  return (
    <div className="App">
      <div className="container">
        <h1 style={style}>RANDOM USER GENERATOR</h1>
        <Button activeUser={activeUser} getUser={getUser}></Button>
        {loading ?
          <h4>Loading...</h4> : <div className="app-user">
            {
              users.map((user, index) => {
                return (
                  <Fragment key={user.cell}>
                    <img src={user.picture.large} alt="UserPicture" />
                    <UserDetails user={user} />
                    <div className="app-icons">
                      {icons.map((icon, index) => {
                        return <i className={icon} key={index} onMouseEnter={() => { activeLinkHandler(index) }} style={activeLink === index ? style : null}></i>

                      })}
                    </div>
                  </Fragment>
                )
              })
            }
          </div>
        }
      </div>
    </div>
  );
}

export default App;

import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            radnomUsers: [],
            radnomUsersId: [],
            favoriteUsers: [],
            favoriteUsersId: [],
            notRepeatId: []
        };
    }

    componentDidMount() {
        fetch('https://api.github.com/users').then(res => {
            res.json().then(data => {
                this.setState({
                    users: data
                }, this.setRundomUsers)
            })
        })
    }

    setRundomUsers = () => {
        const { users } = this.state;
        if (users) {
            let randoms = [];
            let randomsId = [];
            for (let i = 0; i < 4; i++) {
                const randomIndex = Math.floor(Math.random() * users.length);
                randoms.push(users[randomIndex]);
                randomsId.push(users[randomIndex].id);
            }
            this.setState({
                radnomUsers: randoms,
                radnomUsersId: randomsId,
                notRepeat: []
            })
        }
    }

    renderRandomUsers = () => {
        const { radnomUsers, favoriteUsersId } = this.state;

        return radnomUsers.map(user => {
            const isFavoriteUser = favoriteUsersId.includes(user.id);
            return (
                <div key={`user-${user.id}`} onClick={() => this.setFavoriteUser(user)}>
                    <img
                        src={user.avatar_url}
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            border: '4px solid',
                            borderColor: isFavoriteUser ? 'red' : 'transparent'
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: 20
                    }}>
                        {user.login}
                    </div>
                </div>
            )
        })
    }

    setFavoriteUser = (user) => {
        this.setState(({favoriteUsers, favoriteUsersId, notRepeat}) => {
            const repeating = notRepeat.includes(user.id);
            if(!repeating){ 
                return ({
                    favoriteUsers: [...favoriteUsers, user],
                    favoriteUsersId: [...favoriteUsersId, user.id],
                    notRepeat: [...notRepeat, user.id]
                })
            } 
        })
    }

    renderFavoriteUser = () => {
        const { favoriteUsers } = this.state;

        if(favoriteUsers.length){
            return favoriteUsers.map(user => (
                <div key={user.id}>
                    <img 
                        src={user.avatar_url} 
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%'
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        1
                    </div>
                </div>
            ))
        }
        
    }

    render() {
        const { favoriteUsers } = this.state;

        return (
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: 30
                }}>
                    Random Users
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '40px 0'
                }}>
                    {this.renderRandomUsers()}
                </div>
                <div>
                    <button 
                        style={{ width: '100%' }}
                        onClick={this.setRundomUsers}
                    >
                        Update list
                    </button>
                </div>
                <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: 30,
                        margin: '30px 0'
                    }}>
                    Favorite Users {favoriteUsers.length} 
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '40px 0'
                }}> 
                    {this.renderFavoriteUser()}
                </div>
            </div>
        )
    }
}

export default App;
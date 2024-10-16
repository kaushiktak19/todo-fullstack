import React, { useState } from 'react';
import Modal from './components/Modal';
import TaskList from './components/TaskList';

const App = () => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const handleLoginSuccess = (token, username) => {
        setToken(token);
        setUsername(username);
        setIsLogin(true);
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            {isLogin ? (
                <TaskList token={token} username={username} />
            ) : (
                <Modal setToken={handleLoginSuccess} />
            )}
        </div>
    );
};

export default App;

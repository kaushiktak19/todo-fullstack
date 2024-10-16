import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Modal = ({ setToken }) => {
    const [showLogin, setShowLogin] = useState(true); 

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                {showLogin ? (
                    <div>
                        <Login setToken={setToken} />
                        <p className="text-sm mt-4">
                            Don't have an account?{' '}
                            <button
                                onClick={() => setShowLogin(false)}
                                className="text-blue-500 underline"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                ) : (
                    <div>
                        <Signup setToken={setToken} />
                        <p className="text-sm mt-4">
                            Already have an account?{' '}
                            <button
                                onClick={() => setShowLogin(true)}
                                className="text-blue-500 underline"
                            >
                                Log in here
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;

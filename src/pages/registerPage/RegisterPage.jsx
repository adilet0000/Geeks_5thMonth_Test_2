import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/userSlice';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      setError('Все поля должны быть заполнены');
      return;
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (users.some((user) => user.username === username)) {
      setError('Пользователь с таким именем уже существует');
      return;
    }
    dispatch(addUser({ username, password }));
    setError('Пользователь успешно зарегистрирован!');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="register-container">
      <h2>Регистрация</h2>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Подтвердите пароль"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleRegister} className="register-button">Зарегистрироваться</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

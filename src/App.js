import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let password = "";
    let alphabates = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let number = "123456780";
    let specialChar = '~!@#$%^&*()_+=/`.,?,|";:><-';
    if (numberAllowed) alphabates = alphabates.concat(number);
    if (specialCharAllowed) alphabates = alphabates.concat(specialChar);
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * alphabates.length + 1);
      password += alphabates.charAt(char);
    }
    setPassword(password);
  }, [length, numberAllowed, specialCharAllowed]);

  let passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(
    () => generatePassword(),
    [length, numberAllowed, specialCharAllowed, generatePassword]
  );

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <input
          type="text"
          placeholder="password"
          value={password}
          ref={passwordRef}
        />
        <button onClick={copyPassword}>copy</button>
      </div>
      <div>
        <label>
          <input
            type="range"
            value={length}
            min={3}
            max={100}
            onChange={(event) => setLength(event.target.value)}
          />
          Langth::{length}</label>
        <label>
          {" "}
          <input
            type="checkbox"
            defaultValue={false}
            onChange={() => setNumberAllowed(!numberAllowed)}
          />
          Number::{String(numberAllowed)}
        </label>
        <label>
          {" "}
          <input
            type="checkbox"
            defaultValue={false}
            onChange={() => setSpecialCharAllowed(!specialCharAllowed)}
          />
          SpecialCharacter::{String(specialCharAllowed)}
        </label>
      </div>
    </div>
  );
}

export default App;

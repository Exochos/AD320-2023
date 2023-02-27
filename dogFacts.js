/*    _ _  _ ___  ____ ____ ___ ____
      | |\/| |__] |  | |__/  |  [__
      | |  | |    |__| |  \  |  ___]    */
import React, { useEffect, useState } from 'react';
import styles from './DogFact.css';

export default function dogApi() {
  const [returnedValue, setReturnedValue] = useState(null);

  
  async function getData() {
    try {
      const url = 'https://dog-api.kinduff.com/api/facts?number=1';
      const response = await fetch(url);
      const data = await response.json();
      setReturnedValue(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  function handleClick() {
    getData();
  }

  return (
    <React.Fragment>
      <container style={styles.container}>
      <span className='title'>Dog Fact Generator</span>
      <a onClick={handleClick}>
	      <span> </span>
	      <span> </span>
	      <span> </span>
	      <span> </span>
	      Click Me for a new fact!
        </a>
      <p className='facts'>{returnedValue && returnedValue.facts[0]}</p>
      <p><a href="https://github.com/Exochos/AD320-2023">https://github.com/Exochos/AD320-2023</a></p>
      </container>
    </React.Fragment>
  );
}


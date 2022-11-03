import React, { useState } from 'react';
import './App.css';

import Header from "./components/Header";
import MainContent from './components/MainContent';

let lastGuestId = 0;

function App() {
  const [guests, setGuests] = useState([]);

  const [isFiltered, setIsFiltered] = useState(false);

  const [pendingGuest, setPendingGuest] = useState("");

  const toggleGuestProperty = (property, id) => 
    setGuests(
      guests.map((guest) => {
        if (id === guest.id) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        } else {
          return guest;
        }
      })
    );

  const toggleConfirmation = id =>
    toggleGuestProperty('isConfirmed', id);

  const removeGuest = id => 
    setGuests(guests.filter(guest => guest.id !== id));
  
  const toggleEditing = id =>
    toggleGuestProperty('isEditing', id);

  const setName = (name, id) => 
    setGuests(
      guests.map(guest => {
        if (id === guest.id) {
          return {
            ...guest,
            name
          };
        } else {
          return guest;
        }
      })
    );

  const toggleFilter = () => 
    setIsFiltered(!isFiltered);

  const handleNameInput = event => 
    setPendingGuest(event.target.value);

  const newGuestId = () => {
    const id = lastGuestId;
    lastGuestId += 1;
    return id;
  }

  const newGuestSubmitHandler = event => {
    event.preventDefault();

    const id = newGuestId();
    setGuests([
      {
        id,
        name: pendingGuest,
        isConfirmed: false,
        isEditing: false
      },
      ...guests
    ]);
    setPendingGuest('');
  };

  const getTotalInvited = () => 
    guests.length;

  const getAttendingGuest = () => 
    guests.reduce((total, guest) => 
      guest.isConfirmed ? total + 1 : total, 
      0
    );

  const totalInvited = getTotalInvited();
  const numberAttending = getAttendingGuest();
  const numberUnconfirmed = totalInvited - numberAttending;

  return (
    <div className="App">
      <Header 
        newGuestSubmitHandler={newGuestSubmitHandler}
        pendingGuest={pendingGuest}
        handleNameInput={handleNameInput}
      />
      <MainContent 
        toggleFilter={toggleFilter}
        isFiltered={isFiltered}
        totalInvited={totalInvited}
        numberAttending={numberAttending}
        numberUnconfirmed={numberUnconfirmed}
        guests={guests}
        toggleConfirmation={toggleConfirmation}
        toggleEditing={toggleEditing}
        setName={setName}
        removeGuest={removeGuest}
        pendingGuest={pendingGuest}
      />
    </div>
  );
}

export default App;

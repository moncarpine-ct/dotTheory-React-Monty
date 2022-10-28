import React, { useState } from 'react';
import './App.css';

import GuestList from './components/GuestList';
import Counter from './components/Counter';

function App() {
  const [guests, setGuests] = useState(
    [
      {
        name: 'Treasure',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Nic',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'Matt K',
        isConfirmed: false,
        isEditing: true
      }
    ]
  );

  const [isFiltered, setIsFiltered] = useState(false);

  const [pendingGuest, setPendingGuest] = useState("");

  const toggleGuestPropertyAt = (property, indexToChange) => 
    setGuests(
      guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        } else {
          return guest;
        }
      })
    );

  const toggleConfirmationAt = index =>
    toggleGuestPropertyAt('isConfirmed', index);

  const removeGuestAt = index => 
    setGuests([
      ...guests.slice(0, index),
      ...guests.slice(index + 1),
    ]);
  
  const toggleEditingAt = index =>
    toggleGuestPropertyAt('isEditing', index);

  const setNameAt = (name, indexToChange) => 
    setGuests(
      guests.map((guest, index) => {
        if (index === indexToChange) {
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

  const newGuestSubmitHandler = event => {
    event.preventDefault();
    setGuests([
      {
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
      <header> 
        <h1>RSVP</h1>
        <p>A Treehouse App</p>
        <form onSubmit={newGuestSubmitHandler}>
            <input 
              type="text" 
              onChange={handleNameInput}
              value={pendingGuest}
              placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit">Submit</button>
        </form>
      </header>
      <div className="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input 
              type="checkbox"
              onChange={toggleFilter}
              checked={isFiltered} /> Hide those who haven't responded
          </label>
        </div>
        <Counter 
          totalInvited={totalInvited}
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed} />
        <GuestList 
          guests={guests}
          toggleConfirmationAt={toggleConfirmationAt}
          toggleEditingAt={toggleEditingAt}
          setNameAt={setNameAt}
          isFiltered={isFiltered}
          removeGuestAt={removeGuestAt}
          pendingGuest={pendingGuest} />
      </div>
    </div>
  );
}

export default App;

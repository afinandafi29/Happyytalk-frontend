import { useContext, useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import { LayoutContext } from './Layout/Layout';
import { useAuth } from '../contexts/AuthContext';

const RoomGrid = ({ searchTerm, activeCategory }) => {
  const { roomsData: initialRooms, triggerRoomRefresh } = useContext(LayoutContext);
  const { currentUser } = useAuth();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (initialRooms) setRooms(initialRooms);
  }, [initialRooms]);

  // Use real people data from backend, don't overwrite with random profiles
  useEffect(() => {
    if (initialRooms) {
      setRooms(initialRooms);
    }
  }, [initialRooms]);

  // Filter rooms based on search term and active category
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = searchTerm === '' ||
      room.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeCategory === 'all') {
      return matchesSearch;
    } else if (activeCategory === 'english' || activeCategory === '') {
      return matchesSearch;
    } else if (activeCategory === 'trending') {
      return matchesSearch && room.title.toLowerCase() === 'english';
    } else {
      return matchesSearch && room.title.toLowerCase() === activeCategory.toLowerCase();
    }
  });

  return (
    <div className="room-grid" id="room-grid">
      {filteredRooms.map((room) => (
        <RoomCard key={room.id} room={room} currentUser={currentUser} onTopicUpdated={triggerRoomRefresh} />
      ))}
    </div>
  );
};

export default RoomGrid;
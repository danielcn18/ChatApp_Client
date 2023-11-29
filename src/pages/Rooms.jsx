import React, { useState } from 'react';

import Header from '../components/Header';
import RoomMembers from '../components/RoomMembers';
import CreateRoom from '../components/CreateRoom';

const Rooms = ({ user, logout }) => {
    const [err, setErr] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);

    return (
        <>
            <Header username={user.username} logout={logout} link={"/"} icon={"bi-wechat"} />
            <div id="rooms">
                <RoomMembers user={user} setErr={setErr} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                <CreateRoom user={user} err={err} setErr={setErr} selectedUsers={selectedUsers} />
            </div>
        </>
    );
}

export default Rooms;
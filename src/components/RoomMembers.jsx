import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../util';

const RoomMembers = ({ user, setErr, selectedUsers, setSelectedUsers }) => {
    const [userList, setUserList] = useState([]);
    const fetchUsers = async () => {
        axios
            .get(`${baseURL}/users/${user._id}/contacts`, {withCredentials: true})
            .then((res) => {
                if(res.data.users) setUserList(res.data.users);
            })
            .catch(err => {
                console.log(err.message);
                setErr(err.message);
            });
    }
    
    const handleSelect = (contactId) => {
        if (!selectedUsers.includes(contactId)) {
            setSelectedUsers((prev) => [
                ...prev, contactId
            ]);
        } else {
            let newList = selectedUsers.filter(id => id !== contactId);
            setSelectedUsers(newList);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div id="roomMembers">
            <h3>Select Your Room Members</h3>
            <ul className="contacts">
                {userList && userList.map((contact) => {
                    return(
                        <li
                            onClick={() => handleSelect(contact._id)}
                            key={contact._id}
                            className={selectedUsers.includes(contact._id) ? "selected" : ""}
                        >
                            {contact.username}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default RoomMembers;
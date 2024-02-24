export async function postData(obj, login) {
    try {
        const response = await fetch(`/${(login) ? `login` : `signup`}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const data = await response.json();
        if (response.ok) {
            const { userName } = data;
            window.location.href = `/userpage?userName=${userName}`;
        }
        else {
            throw new Error(`${data.error}`);
        }
    }
    catch (err) {
        alert(err.message);
    }
}

export async function postGroupData(obj, join){
    try {
        const response = await fetch(
            `/${ (join === true) ? "joinGroup/jgrp" : "createGroup/cgrp" }`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(obj)
            }
        );
        const data = await response.json();
        if(response.ok){
            window.location.href = `/group?groupName=${obj.groupName}?userName=${obj.userName}`;
        }
        else{
            throw new Error(`${data.error}`);
        }
    } catch (error) {
        alert(error.message);
    }
}